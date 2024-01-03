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
    if (name.length < 3) return false;
    return true;
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

    // verificare nume corect
    const [nameError, setNameError] = useState<string>('');

    const storedUserData = localStorage.getItem('userData');
    // console.log(storedUserData);
    //salvare in baza de date
    const handleSubmitCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            const event = {
                name: formData.get('name')?.toString() || '',
                date: formData.get('date')?.toString() || '',
                hour: formData.get('time')?.toString() || '',
                judet: formData.get('judet')?.toString() || '',
                loc: formData.get('loc')?.toString() || '',
                linkMaps: formData.get('linkMaps')?.toString() || '',
                partNumber: formData.get('partNumber')?.toString() || 0,
                volNumber: formData.get('volNumber')?.toString() || 0,
                sdPrice: formData.get('sdPrice')?.toString() || '',
                vipPrice: formData.get('vipPrice')?.toString() || 0,
                descEvent: formData.get('descEvent')?.toString() || '',
                id: userData.id
            };
            console.log(event);
            //check
            if(event.name !== '' || event.date !== '' || event.hour !== '' || event.judet !== '' || event.loc !== '' ||
                event.linkMaps !== '' || event.partNumber !== 0 || event.sdPrice !== '' ){
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
            }
            else
                alert('Check the mandatory inputs.');
        }

    };

    return (
        <div className="create-event">
            <p className="title-form">Create event</p>
            <form className="form" onSubmit={handleSubmitCreate}>
                <span className="required">Marked inputs are mandatory.</span>
                <div className="label-input">
                    Event name<span className="required">*</span>
                </div>
                <input type="text" name="name" className="form-input" placeholder="Event name"  onChange={(e) => {
                    const value = e.target.value.trim();
                    if (!isValidString(value)) {
                        setNameError('This is not a valid name.');
                    } else {
                        setNameError('');
                    }
                }}/>
                <span className="error">{nameError}</span>
                <div className="form-row for-centring">
                    <div className="label-input">
                        Date<span className="required">*</span>
                    </div>
                    <input type="date" name="date" className="form-row-elem form-input" min={getMinDate()}/>
                    <div className="label-input">
                        Starting hour<span className="required">*</span>
                    </div>
                    <input type="time" name="time" className="form-row-elem form-input"/>
                </div>
                Location
                <div className="form-row for-centring select-container">
                    <div className="label-input">
                        Judet<span className="required">*</span>
                    </div>
                    {/*<label htmlFor="judetSelect">Judet</label>*/}
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
                    {/*<label htmlFor="localitateSelect">Localitate</label>*/}
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
                <div className="label-input">
                    Link maps<span className="required">*</span>
                </div>
                <input type="link" name="linkMaps" className="form-input" placeholder=""/>
                <div className="form-row for-centring">
                    <div className="label-input">
                        No participants<span className="required">*</span>
                    </div>
                    <input type="number" name="partNumber" className="form-row-elem2 form-input" placeholder=""/>
                    <div className="label-input">
                        No volunteers
                    </div>
                    <input type="number" name="volNumber" className="form-row-elem2 form-input" placeholder=""/>
                </div>
                <div className="form-row for-centring">
                    <div className="label-input">
                        Standard price<span className="required">*</span>
                    </div>
                    <input type="number" name="sdPrice" className="form-row-elem2 form-input" placeholder=""/>
                    <div className="label-input">
                        VIP price
                    </div>
                    <input type="number" name="vipPrice" className="form-row-elem2 form-input" placeholder=""/>
                </div>
                <div className="label-input">
                    Describe of the event<span className="required">*</span>
                </div>
                <textarea id="descEvent"></textarea>
                <div className="for-centring">
                    <button className="btn-form2">Create event</button>
                </div>

            </form>
        </div>
    );
}
export default FormCreateEvent;
