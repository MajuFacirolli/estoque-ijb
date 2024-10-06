import { useState } from "react";
import { StorageEditForm } from "../forms/StorageEditForm";
import { StorageMaterial } from "../../services/storageApi";
import { useCustomEvent } from "../../utils/useCustomEvent";
import { Modal } from "../../styles/Modal/Modal";

interface StorageEditModalProps {
    selectedMaterial: StorageMaterial | null;
}

export const StorageEditModal = ({ selectedMaterial }: StorageEditModalProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    function handleModalOpen() {
        setIsModalOpen(true);
    }

    function handleModalClose() {
        setIsModalOpen(false);
    }

    useCustomEvent("storage:open-edit-modal", handleModalOpen);
    useCustomEvent("storage:close-edit-modal", handleModalClose)

    return (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
            <div className="modal-container">
                <h1>Especificações <span>Material</span></h1>
                {selectedMaterial && (
                    <StorageEditForm selectedMaterial={selectedMaterial} />
                )}
            </div>
        </Modal>
    );
};
