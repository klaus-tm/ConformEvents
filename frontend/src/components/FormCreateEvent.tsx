import {useEffect, useState} from "react";
const baseURL: string = "http://localhost:8090";
interface Locality {
    nume: string;
    diacritice: string;
}
interface LocalityData {
    [judet: string]: Locality[];
}
function isValidString(name: string): boolean {
    return name.length > 3;
}
function isValidInt(value: string) {
    return /^[0-9]+$/.test(value);
}
function isValidStravaLink(link: string) {
    // Expresia regulată pentru un link Strava
    const stravaRegex = /^https:\/\/www\.strava\.com\/routes\/(\d+)$/;
    return stravaRegex.test(link);
}
function FormCreateEvent() {
    //constrangere data
    const getMinDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 2); // Adaugă două zile la data curentă
        return today.toISOString().split('T')[0];
    };

    // umplere select judete si localitate
    const [judetSelectat, setJudetSelectat] = useState('');
    const [localitateSelectata, setLocalitateSelectata] = useState('');
    const [judete, setJudete] = useState<string[]>([]);
    const [localitati, setLocalitati] = useState<LocalityData>({});

    // incarca judete si localitati
    useEffect(() => {
        const incarcaDate = async () => {
            try {
                const response = await fetch('/judete-localitati-ro.json');
                const data: LocalityData = await response.json();
                setJudete(Object.keys(data));
                setLocalitati(data);
                setJudetSelectat('');
                setLocalitateSelectata('');
            } catch (error) {
                console.error('Eroare la încărcarea datelor:', error);
            }
        };

        incarcaDate();
    }, []);

    const handleJudetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const judet = e.target.value;
        setJudetSelectat(judet);
        setLocalitateSelectata('');
    };

    //adauga sau sterge tipuri de pret
    const [prices, setPrices] = useState([{ priceName: "", price: "" }]);
    const [topModifier, setTopModifier] = useState(70);
    const [heightModifier, setHeightModifier] = useState(760);
    const handleAddPrice = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setPrices([...prices, { priceName: "", price: "" }]);
        setTopModifier((prevTopModifier) => prevTopModifier + 30);
        setHeightModifier((prevHeightModifier) => prevHeightModifier + 65);
    };
    const handleDeletePrice = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        const newPrices = [...prices];
        newPrices.splice(index, 1);
        setPrices(newPrices);
        // Actualizare modificator top
        setTopModifier((prevTopModifier) => prevTopModifier - 30);

        // Actualizare modificator height
        setHeightModifier((prevHeightModifier) => prevHeightModifier - 65);

        //console.log(topModifier, heightModifier);
    };
    // verificare nume corect
    const [nameError, setNameError] = useState<string>('');
    const [numberError, setNumberError] = useState<string>('');
    const [linkError, setLinkError] = useState<string>('');
    const storedUserData = localStorage.getItem('userData');
    //salvare in baza de date
    const handleSubmitCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            // console.log(userData);
            const name = formData.get('name')?.toString() || '';
            const deadline = formData.get('deadline')?.toString() || '';
            const date = formData.get('date')?.toString() || '';
            const judet = formData.get('judet')?.toString() || '';
            const hour = formData.get('hour')?.toString() || '';
            const loc = formData.get('loc')?.toString() || '';
            const maps = formData.get('linkMaps')?.toString() || '';
            const desc = formData.get('descEvent')?.toString() || '';
            // check the date
            // console.log("name !== ''", name !== '')
            // console.log("isValidString(name)",isValidString(name))
            // console.log("deadline",deadline !== '')
            // console.log("date, hour",date !== '' && hour !== '')
            // console.log("judet, loc",judet !== '' && loc !== '')
            // console.log(maps !== '' && desc !== '' && isValidString(desc));
            if(name !== '' && isValidString(name) && deadline !== '' && date !== '' && hour !== '' && judet !== ''
                && loc !== '' && maps !== '' && desc !== '' && isValidString(desc)){
                if (deadline < date) {
                    // console.log(prices);
                    // check the prices
                    if (prices.every(price => price.priceName !== '' && price.price !== '') &&
                        prices.every(price => isValidInt(price.price))) {
                        const typesString = prices.map(price => price.priceName).join('*');
                        const pricesString = prices.map(price => price.price).join('*');

                        const event = {
                            organizer: {id:userData.id},
                            name: name,
                            date: date,
                            startHours: hour,
                            cityRegion: loc + ", " + judet,
                            registerLimit: deadline,
                            raceMap: maps,
                            volunteersNumber: formData.get('volNumber')?.toString() || 0,
                            description: desc,
                            racePrices: pricesString,
                            raceTypes: typesString
                        };
                        console.log(event);
                        //Create event
                        const response = await fetch(baseURL + '/events', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(event)
                        });
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        else
                            alert('The event was created.');
                    } else
                        alert('All price fields in the form are mandatory. The second field must be an integer.');
                }
                else
                    alert('The registration deadline must be before the competition.');
            }
            else
                alert('Check the mandatory inputs.');
        }
    };

    return (
        <div className="create-event" style={{ top: `calc(50% + ${topModifier}px)`, height: `${heightModifier}px` }}>
            <p className="title-form">Create event</p>
            <form className="form"  onSubmit={handleSubmitCreate}>
                <span className="required">Marked inputs are mandatory.</span>
                <div className="horizontal for-centring">
                    <div className="label-input">
                        Event name<span className="required">*</span>
                    </div>
                    <div className="vertical">
                        <input type="text" name="name" className="orizontal-elem form-input" placeholder="Event name"
                               onChange={(e) => {
                                    const value = e.target.value.trim();
                                    if (!isValidString(value)) {
                                        setNameError('This is not a valid name.');
                                    } else {
                                        setNameError('');
                                    }
                                }}/>
                        <span className="error">{nameError}</span>
                    </div>
                    <div className="label-input">
                        Registration deadline<span className="required">*</span>
                    </div>
                    <input type="date" name="deadline" className="orizontal-elem form-input" min={getMinDate()}/>
                </div>

                <div className="horizontal for-centring">
                    <div className="label-input">
                        Date<span className="required">*</span>
                    </div>
                    <input type="date" name="date" className="orizontal-elem form-input" min={getMinDate()}/>
                    <div className="label-input">
                        Starting hour<span className="required">*</span>
                    </div>
                    <input type="time" name="hour" className="orizontal-elem form-input"/>
                </div>
                Location
                <div className="horizontal for-centring select-container">
                    <div className="label-input">
                        Judet<span className="required">*</span>
                    </div>
                    <select name="judet" id="judetSelect" onChange={handleJudetChange} value={judetSelectat || ''}>
                        <option value="">Selecteaza un judet</option>
                        {judete.map(judet => (
                            <option key={judet} value={judet}>
                                {judet}
                            </option>
                        ))}
                    </select>
                    <div className="label-input">
                        Locality<span className="required">*</span>
                    </div>
                    <select name="loc" id="localitateSelect" onChange={(
                            e) => setLocalitateSelectata(e.target.value)
                        } value={localitateSelectata || ''}>
                            {judetSelectat && localitati[judetSelectat]
                                ? localitati[judetSelectat].map(localitate => (
                                    <option key={localitate.nume} value={localitate.nume}>
                                        {localitate.nume}
                                    </option>
                                ))
                                : <option value="">Selecteaza o localitate</option>
                            }
                    </select>
                </div>
                <div className="horizontal for-centring">
                    Link maps<span className="required">*</span>
                    <div className="vertical">
                        <input type="text" name="linkMaps" className="orizontal-elem form-input"
                               placeholder="The starting location" onChange={(e) => {
                                   const value = e.target.value.trim();
                                    if (!isValidStravaLink(value)) {
                                        setLinkError('Please enter a valid Google Maps or Waze link.');
                                    } else {
                                        setLinkError('');
                                    }
                            }}/>
                        <span className="error">{linkError}</span>
                    </div>
                    <div className="label-input">
                        No volunteers
                    </div>
                    <div className="vertical">
                        <input type="number" name="volNumber" className="orizontal-elem form-input" placeholder="" onChange={(e) => {
                                   const value = e.target.value;
                                   if (!isValidInt(value)) {
                                       setNumberError('Please enter a valid number.');
                                   } else {
                                       setNumberError('');
                                   }
                               }}
                            />
                        <span className="error">{numberError}</span>
                    </div>
                </div>
                <div className="price-div horizontal for-centring">
                    <div className="price-header vertical2">
                        Prices list:<span className="required">*</span>
                    </div>
                    {prices.map((price, index) => (
                        <div className={`price-set-${index} price horizontal`} key={index}>
                            <input type="text" name={`priceName-${index}`} className="orizontal-elem2 form-input"
                                placeholder="Type of price" value={price.priceName} onChange={(e) => {
                                    const inputValue = e.target.value;
                                    const newPrices = [...prices];
                                    newPrices[index].priceName = inputValue;
                                    setPrices(newPrices);
                                }}
                            />
                            <div className="vertical">
                                <input type="number" name={`price-${index}`} className="orizontal-elem2 form-input" placeholder="Price"
                                       value={price.price} onChange={(e) => {
                                    const inputValue = e.target.value;
                                    const newPrices = [...prices];
                                    newPrices[index].price = e.target.value;
                                    newPrices[index].price = e.target.value;
                                    setPrices(newPrices);

                                    if (!isValidInt(inputValue)) {
                                        setNumberError('Please enter a valid number.');
                                    } else {
                                        setNumberError('');
                                    }
                                }}
                                />
                                <span className="error">{numberError}</span>
                            </div>
                            <button className="btn-form3 del" onClick={(e) => handleDeletePrice(e, index)}>-</button>
                        </div>
                    ))}
                </div>
                <div className="horizontal for-centring">
                    <button className="btn-form2 add" onClick={handleAddPrice}>Add type of price</button>
                </div>
                <div className="label-input">
                    Describe of the event<span className="required">*</span>
                </div>
                <textarea name="descEvent" id="descEvent"></textarea>
                <div className="for-centring">
                    <button className="btn-form2">Create event</button>
                </div>
            </form>
        </div>
    );
}
export default FormCreateEvent;
