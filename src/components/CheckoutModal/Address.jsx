import React, {useState} from 'react'
import styles from './Checkout.module.css';
import AddressIcon from "../../assets/address.svg?react";
import AddAddressModal from "../AddAddressModal/AddAddressModal.jsx";

const Address = ({addresses, selectedAddress, setSelectedAddress}) => {
    const [addressModalOpen, setAddressModalOpen] = useState(false);

    return (
        <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Адрес доставки</h4>
            <div className={styles.selectionList}>
                {!!addresses && addresses.map(addr => (
                    <label key={addr.id} className={`${styles.selectionItem} ${selectedAddress?.id === addr.id ? styles.selected : ''}`}>
                        <AddressIcon />
                        <div className={styles.selectionInfo}>
                            <span className={styles.selectionInfoTitle}>{addr.title}</span>
                            <span className={styles.selectionInfoDesc}>{addr.fullAddress}</span>
                        </div>
                        <input
                            type="radio"
                            name="address"
                            value={addr.id}
                            checked={selectedAddress?.id === addr.id}
                            onChange={() => setSelectedAddress(addr)}
                        />
                    </label>
                ))}
                <button onClick={() => setAddressModalOpen(true)} className={styles.addButton}>+ Добавить новый адрес</button>
            </div>
            <AddAddressModal isOpen={addressModalOpen} onClose={() => setAddressModalOpen(false)} />
        </div>
    );
};

export default Address;