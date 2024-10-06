import { useState } from "react"
import { OutletRegisterForm } from "../forms/OutletRegisterForm";
import { useCustomEvent } from "../../utils/useCustomEvent";
import { Modal } from "../../styles/Modal/Modal";

export const OutletRegisterModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  function handleModalOpen() {
    setIsModalOpen(true);
  }
  
  function handleModalClose() {
    setIsModalOpen(false);
  }
  
  useCustomEvent("outlet:open-register-modal", handleModalOpen);
  useCustomEvent("outlet:close-register-modal", handleModalClose)

  return (
    <Modal isOpen={isModalOpen} onClose={handleModalClose}>
      <div className="modal-container">
        <h1>Novo Registro <span>Outlet</span></h1>
        <OutletRegisterForm handleCancel={handleModalClose}/>
      </div>
    </Modal>
  )
}