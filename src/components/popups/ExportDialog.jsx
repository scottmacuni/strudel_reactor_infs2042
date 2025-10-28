import { useState } from "react";
import { LOCAL_STORAGE_SOUNDS_KEY } from "../../lib/helpers";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegSave } from "react-icons/fa";

function ExportDialog({
    isOpen,
    onClose,
    currentLayers,
    currentTempo
}) {
    const [soundLabel, setLabel] = useState("");

    // Only render on open state
    if (!isOpen) return null;

    // Export values to local storage and close dialog after timeout
    function onExport() {
        exportToLocalStorage();
        setTimeout(() =>{
            onClose()
        }, 800)
    }

    function exportToLocalStorage(){
        console.log("exporting...")
        if (!currentLayers || !soundLabel || !currentTempo) return;
        // Validate atleast one sound to save
        const layersWithSounds = currentLayers.filter(layer => layer.trim() !== "") 
        if(!layersWithSounds || layersWithSounds.length === 0) return; 

        // Get existing storage if it exists to append to
        const storedSounds = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SOUNDS_KEY)) || [];

        // Add/overwrite sound, add all even blank for easier import
        storedSounds.push({"label": soundLabel, "tempo": currentTempo, "layers": currentLayers});

        // Re-append to local storage with update
        localStorage.setItem(LOCAL_STORAGE_SOUNDS_KEY, JSON.stringify(storedSounds));
        console.log("set new value: ", storedSounds)
    }

  return (
    <div className="popup">
      <div className="popup-content-sm">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <h4 className="text-xl text-roboto text-default-white"><b>Save Sound Loop</b></h4>
          <div>
            <button 
                disabled={!currentLayers || currentLayers.filter(layer => layer.trim() !== "").length <= 0 || !soundLabel} 
                className="btn btn-outline-success ml-2"
                onClick={onExport}
            >
                <FaRegSave size={16} />
            </button>     
             <button className="btn btn-outline-danger ml-2" onClick={onClose}>
              <IoCloseSharp size={14} />
            </button>           
          </div>
        </div>
        <div className="flex flex-row">
            <p className="text-lg text-default-white text-roboto mr-3 mt-1">ID: </p>
           <input placeholder="reference name" type="text" className="form-control-sm mb-3" onChange={(e) => setLabel(e.target.value)} />
        </div>
        <div className="flex flex-row">
        {/* Preview sounds or inform of empty layers */}
        <div className="mr-3">
           <p className='text-lg text-default-white text-roboto'>Current Layers:</p>
            { currentLayers && currentLayers.filter(layer => layer.trim() !== "").length > 0 ? (
                <ol>
                    {currentLayers.map((layer, idx) => (
                        <li className="text-md text-default-white text-roboto" key={idx}>{layer || "(emtpty)"}</li>
                    ))}
                </ol>
                ) : (
                    <p className='text-md text-default-white text-roboto'>No Sound Layers To Export</p>
                )
            }           
        </div>
        <p className='text-lg text-default-white text-roboto ml-4'>Current Tempo: {currentTempo || "(no tempo)"}</p>
        </div>
      </div>
    </div>
  );
}

export default ExportDialog