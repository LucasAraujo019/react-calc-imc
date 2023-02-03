import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import { levels, calculateImc, Level } from './helpers/imc';
import { GridItem } from './components/GridItem/GridItem'
import leftArrowImage from './assets/leftarrow.png'


const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0)
  const [toShow, setToShow] = useState<Level | null>(null);
  
  const handleCalculateButton = ()=> {
    if(heightField && weightField){
      setToShow(calculateImc(heightField, weightField));
    } else {
      alert("Digite todos os campos.")
    }
  }

  const handleBackButton = ()=> {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }


  return (
    <div className={styles.main}>
      <header>            {/* HEADER */}
        <div className={styles.headerContainer}>
          <h1>Índice de Massa Corpórea</h1>
        </div>
      </header>            {/* End HEADER */}




      <div className={styles.container}>
        <div className={styles.leftSide}> {/* LEFTSIDE */}
          <h1>Calcule o seu IMC.</h1>
          <p>O IMC é um cálculo simples que permite avaliar se a pessoa está dentro do peso que é considerado ideal para a sua altura. <br />
          Também conhecido como Índice de Massa Corporal, o IMC é uma fórmula utilizada por vários profissionais de saúde, incluindo médicos, enfermeiros e nutricionistas, para saber, de uma forma rápida, se a pessoa precisa ganhar ou perder peso.</p>

          <input type="number"
          placeholder='Digite a sua altura, Ex: 1.70 (em metros)'
          value={heightField > 0 ? heightField : ''}
          onChange={e => setHeightField(parseFloat(e.target.value))}
          disabled={toShow ? true : false}
          />
          <input type="number"
          placeholder='Digite o seu peso, Ex: 75.3 (em kg)'
          value={weightField > 0 ? weightField : ''}
          onChange={e => setWeightField(parseFloat(e.target.value))}
          disabled={toShow ? true : false}
          />

          <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>
        </div>                    {/* End LEFTSIDE */}



        <div className={styles.rightSide}>
          {!toShow &&
          <div className={styles.grid}>
            {levels.map((item, key)=>(
              <GridItem key={key} item={item}/>
            ))}
          </div>
          }

          {toShow && 
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25} />
              </div>
              <GridItem item={toShow}/>
            </div>
          }
        </div>
      </div>
          <footer className={styles.footer}>© 2022 Lucas Araújo </footer>
      </div>
  );
}

export default App;