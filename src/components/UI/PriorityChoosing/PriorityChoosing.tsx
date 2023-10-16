import React, { FC, useState } from 'react';
//@ts-ignore
import styles from "./PriorityChoosing.module.css";
import {IChosenItem} from "../../../types/data";



interface PriorityChoosingProps {
    setPriority: (num: number) => void;
    chosen: IChosenItem[];
    setChosen: (items: IChosenItem[]) => void;
    handleChangePriority: (index:number) => void;
}

const PriorityChoosing: FC<PriorityChoosingProps> = ({ setPriority, chosen, setChosen,handleChangePriority }) => {

    return (
        <div className={styles.priority}>
            <div className={styles.priority__items}>
                {chosen.map((item, index) => (
                    <button
                        key={item.id}
                        onClick={() => handleChangePriority(index)}
                        className={`${styles.priority__item} ${item.chosen ? styles.priority__chosen : ''}`}
                    >
                        {item.id + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PriorityChoosing;
