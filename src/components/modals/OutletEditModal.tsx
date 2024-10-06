import { useState } from "react";
import { OutletProduct } from "../../services/outletApi";
import { OutletEditForm } from "../forms/OutletEditForm";
import { useCustomEvent } from "../../utils/useCustomEvent";
import { Modal } from "../../styles/Modal/Modal";

interface OutletEditModalProps {
    selectedProduct: OutletProduct | null;
}

export const OutletEditModal = ({ selectedProduct }: OutletEditModalProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    function handleModalOpen() {
        setIsModalOpen(true);
    }

    function handleModalClose() {
        setIsModalOpen(false);
    }

    useCustomEvent("outlet:open-edit-modal", handleModalOpen);
    useCustomEvent("outlet:close-edit-modal", handleModalClose)

    return (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
            <div className="modal-container">
                <h1>Especificações <span>Produto</span></h1>
                {selectedProduct && (
                    <OutletEditForm selectedProduct={selectedProduct} />
                )}
            </div>
        </Modal>
    );
};
