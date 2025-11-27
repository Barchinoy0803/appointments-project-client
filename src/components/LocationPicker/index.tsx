import { Modal, Button } from "antd";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { setLocationModal } from "../../redux/features/modal.slice";
import { defaultIcon } from "../../constants";

interface LocationPickerProps {
    position: number,
    setPosition: Dispatch<SetStateAction<[number, number] | null>>
}


export const LocationPicker = ({ position, setPosition }: LocationPickerProps) => {
    const { isOpen } = useSelector((state: RootState) => state.modal.locationModal)

    const dispatch = useDispatch()

    function FixMapResize() {
        const map = useMap();

        useEffect(() => {
            setTimeout(() => {
                map.invalidateSize();
            }, 300);
        }, []);

        return null;
    }

    function LocationMarker() {
        useMapEvents({
            click(e) {
                setPosition([e.latlng.lat, e.latlng.lng]);
            },
        });

        return position ? <Marker position={position as any} icon={defaultIcon}/> : null;
    }

    return (
        <>
            <Button
                onClick={() => dispatch(setLocationModal({ isOpen: true }))}
            >
                Select location
            </Button>

            <Modal
                open={isOpen}
                onCancel={() => dispatch(setLocationModal({ isOpen: false }))}
                footer={null}
                width={900}
            >
                <div className="flex flex-col gap-5">
                    <MapContainer
                        center={[41.31, 69.24]}
                        zoom={12}
                        style={{ height: "600px" }}
                    >
                        <FixMapResize />
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <LocationMarker />
                    </MapContainer>
                    <Button variant="solid" onClick={() => dispatch(setLocationModal({ isOpen: false }))}>Save</Button>
                </div>
            </Modal>
        </>
    );
}
