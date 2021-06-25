import styles from './ProgressBar.module.css'
import {useState, useEffect} from 'react'
export default function ProgressBar(contents){
    const [display, setDisplay] = useState('<')
    function handleNav () {
        if (document.getElementById('floating-modal').style.width !== '0px') {
          document.getElementById('floating-modal').style.width = '0px'
          document.getElementById('floating-modal').style.display = 'none'
          document.getElementById('close-button').style.marginLeft = '0px'
          setDisplay('>')
        } else {
          document.getElementById('floating-modal').style.width = 'fit-content'
          document.getElementById('floating-modal').style.display = 'block'
          setDisplay('<')
          document.getElementById('close-button').style.marginLeft = getComputedStyle(document.getElementById('floating-modal')).width
        }
    }
    useEffect(()=>{
        document.getElementById('close-button').style.marginLeft = getComputedStyle(document.getElementById('floating-modal')).width
    },[]);
    return(
      <div>
        <button id='close-button' className={styles.openbtn} onClick={handleNav}>{display}</button>
        <div id='floating-modal' className={styles.floatingModal}>
          <div className={styles.StepVertical}>
            {contents.contents.map((v, i) => {
                return (
                  <div className={styles.StepItem}>
                      <div className={styles.ItemContainer}>
                        <div className={styles.ItemTail}></div>
                        <div className={styles.ItemIcon}><span className={styles.StepIcon}>{`${i}`}</span></div>
                        <div className={styles.ItemContent}>
                          <div className={styles.ItemTitle}>
                            {`${v}`}
                          </div>
                        </div>
                      </div>
                  </div>
                );
            })}
          </div>
        </div>
      </div> 
    );
}