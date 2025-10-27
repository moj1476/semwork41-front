import {useState} from "react";
import styles from '../../pages/AdminPage/AdminPage.module.css';
import ComponentModal from "../ComponentModal/ComponentModal.jsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {API_ENDPOINTS, apiClient, BASE_URL} from "../../api/index.js";

const ManageComponents = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingComponent, setEditingComponent] = useState(null);

    const handleOpenModal = (component = null) => {
        setEditingComponent(component);
        setModalOpen(true);
    };
    const queryClient = useQueryClient();
    const {data} = useQuery(
        {
            queryKey: ['components'],
            queryFn: () => apiClient(
                BASE_URL + API_ENDPOINTS.ADMIN_GET_ALL_COMPONENTS,
                {
                    method: 'GET',
                },
                true
            )
        }
    )

    const {mutate: saveComponent} = useMutation(
        {
            mutationFn: (vars) => apiClient(
                BASE_URL + API_ENDPOINTS.ADMIN_ADD_COMPONENTS,
                {
                    method: 'POST',
                    body: JSON.stringify(vars),
                },
                true
            ),
            onSettled: () => {
                queryClient.invalidateQueries("components")
            }
        }
    )

    const {mutate: deleteComponent} = useMutation({
        mutationFn: (vars) => apiClient(
            BASE_URL + API_ENDPOINTS.ADMIN_REMOVE_COMPONENTS + `/${vars.id}`,
            {
                method: 'DELETE',
            },
            true
        ),
        onSettled: () => {
            queryClient.invalidateQueries("components")
        }
    })

    const {mutate: updateComponent} = useMutation({
        mutationFn: (vars) => apiClient(
            BASE_URL + API_ENDPOINTS.ADMIN_EDIT_COMPONENTS + `/${editingComponent.id}`,
            {
                method: 'PUT',
                body: JSON.stringify(vars),
            },
            true
        ),
        onSettled: () => {
            queryClient.invalidateQueries("components")
        }
    })

    const handleSave = (component) => {
        const mode = editingComponent === null ? "create" : "edit";
        if(mode === "create") {
            saveComponent(component);
        } else {
            updateComponent(component);
        }
    };

    const handleDelete = (id) => {
        deleteComponent(id)
    }

    return (
        <div className={styles.tabContent}>
            <div className={styles.tabHeader}>
                <h2>Управление компонентами</h2>
                <button className={styles.actionButton} onClick={() => handleOpenModal()}>+ Добавить компонент</button>
            </div>
            <table className={styles.table}>
                <thead><tr><th>ID</th><th>Категория</th><th>Название</th><th>Цена</th><th>Действия</th></tr></thead>
                <tbody>
                {!!data && data.map(c => (
                    <tr key={c.id}>
                        <td>{c.id}</td><td>{c.category}</td><td>{c.name}</td><td>{c.price} BYN</td>
                        <td>
                            <button className={styles.editButton} onClick={() => handleOpenModal(c)}>Редакт.</button>
                            <button className={styles.deleteButton} onClick={() => handleDelete(c.id)}>Удалить</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <ComponentModal
                onSubmit={handleSave}
                componentData={editingComponent}
                mode={editingComponent === null ? "create" : "edit"}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)} />
        </div>
    );
};

export default ManageComponents;