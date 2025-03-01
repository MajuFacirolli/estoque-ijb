import { useEffect, useState } from "react";
import { PlusCircle } from "phosphor-react";
import { Header } from "./components/StorageHeader";
import { StorageRegisterModal } from "./components/modals/StorageRegisterModal";
import { getMaterials, StorageMaterial } from "./services/storageApi";
import { StorageEditModal } from "./components/modals/StorageEditModal";
import { publish } from "./utils/events";

export const Storage = () => {
    const [storageMaterials, setStorageMaterials] = useState<StorageMaterial[]>([]);
    const [selectedMaterial, setSelectedMaterial] = useState<StorageMaterial | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    async function loadStorageMaterials() {
        const response = await getMaterials();
        setStorageMaterials(response);
    }

    useEffect(() => {
        loadStorageMaterials();
    }, [storageMaterials]);

    const handleEditStorageMaterial = (material: StorageMaterial) => {
        setSelectedMaterial(material);
        publish("storage:open-edit-modal");
    };

    const filteredMaterials = storageMaterials.filter(material =>
        material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="storage-container">
            <Header title="Estoque" />
            <section className="storage-search">
                <input 
                    type="text" 
                    placeholder="Pesquisar material" 
                    className="form-control search-input"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <PlusCircle size={26} onClick={() => publish("storage:open-register-modal")} />
            </section>
            <section className="storage-material-list">
                <table>
                    <thead>
                        <tr>
                            <th>Material</th>
                            <th>Código</th>
                            <th>Quantidade</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMaterials.map((material) => (
                            <tr key={material.id} onClick={() => handleEditStorageMaterial(material)}>
                                <td>{material.name}</td>
                                <td>{material.id}</td>
                                <td>{material.quantity}</td>
                                <td>{material.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <StorageRegisterModal />
            <StorageEditModal selectedMaterial={selectedMaterial} />
        </main>
    );
};