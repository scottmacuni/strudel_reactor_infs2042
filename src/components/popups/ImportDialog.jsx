import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { IoIosDownload } from "react-icons/io";
import { LOCAL_STORAGE_SOUNDS_KEY } from "../../lib/helpers";

function ImportDialog({
    isOpen,
    onClose,
    setLayers
}) {
    const [loadedSounds, setLoadedSounds] = useState([]);
    const [selectedSoundLoop, setSelected] = useState([]);
 
    // Fetch sounds from local storage
    useEffect(() =>{
        // Get existing storage if it exists
        const storedSounds = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SOUNDS_KEY));
        console.log("stored sound: ",storedSounds)
        if(!storedSounds) return;
        setLoadedSounds(storedSounds) // set so options can be rendered
        setSelected(storedSounds[0])
    }, [isOpen])   

    // Export values to local storage and close dialog after timeout
    function onImport() {
        if(!selectedSoundLoop || selectedSoundLoop["layers"].length <= 0) return;

        const importedSoundLayers = selectedSoundLoop["layers"]
        setLayers(importedSoundLayers)
        
        setTimeout(() =>{
            onClose()
        }, 800)
    }

    // Only render on open state
    if (!isOpen) return null;

  return (
    <div className="popup">
      <div className="popup-content-sm">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <h4 className="text-xl text-roboto text-default-white"><b>Import Sound Loop</b></h4>
         <div>
            <button 
                disabled={!selectedSoundLoop} 
                className="btn btn-outline-success ml-2"
                onClick={onImport}
            >
                <IoIosDownload size={16} />
            </button>     
             <button className="btn btn-outline-danger ml-2" onClick={onClose}>
              <IoCloseSharp size={14} />
            </button>           
          </div>
        </div>
        <div>
            {/* Preview stored sounds to select */}
            <div>
               <p className='text-lg text-default-white text-roboto'>Select Sound To Import:</p>
                { loadedSounds && loadedSounds.length > 0 ? (
                    <div>
                        <select 
                            className="form-select"
                            onChange={(e) => {
                                const selectedIdx = e.target.value;
                                const selectedSound = loadedSounds[selectedIdx];
                                setSelected(selectedSound)
                                console.log("seleced: ", selectedSound)
                            }}
                        >
                            {loadedSounds.map((sound, idx) => (
                                <option value={idx} key={idx}>{sound["label"]}</option>
                            ))}
                        </select>
                        <p className="mt-3 text-md text-default-white text-roboto text-center">
                            Tempo: {selectedSoundLoop["tempo"]}
                        </p>
                        <p className="mt-2 text-md text-default-white text-roboto text-center">Sound layers: 
                            {" " + selectedSoundLoop["layers"]
                                .filter(sound => sound.trim() !== "").length
                            }
                        </p>
                    </div>
                    ) : (
                        <p className='text-md text-default-white text-roboto'>No Saved Sounds To Import</p>
                    )
                }                        
            </div>
        </div>
      </div>
    </div>
  );
}

export default ImportDialog