import { useState } from 'react'
import { PrimeReactProvider } from 'primereact/api'
import { ColorPicker, ColorPickerHSBType, ColorPickerRGBType } from 'primereact/colorpicker'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { CodeBlock, dracula } from 'react-code-blocks'
import './App.css'
import 'primereact/resources/themes/lara-light-blue/theme.css';
import '/node_modules/primeflex/primeflex.css'

function App() {
  const [mainColor, setMainColor] = useState<string | ColorPickerRGBType | ColorPickerHSBType | undefined>(
    getComputedStyle(document.documentElement).getPropertyValue('--mainColor')
  )
  const [visible, setVisible] = useState(false)
  const code = `
    :root {
      --mainColor: #${mainColor};
    }
  `

  const downloadFile = () => {
    const link = document.createElement("a");
    const content = code.replaceAll('\n', '').replaceAll(' ', '');
    const file = new Blob([content], { type: 'text/css' });
    link.href = URL.createObjectURL(file);
    link.download = "sample.css";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  return (
    <PrimeReactProvider>
      <section id='ColorsContainer' className='flex flex-column gap-3'>
        <article id='MainColorContainer' className='flex gap-3'>
          <label htmlFor="ColorPickerMainColorInput">Main color</label>
          <ColorPicker
            id='ColorPickerMainColorInput'
            value={mainColor}
            onChange={(e) => {
              if (e.value) {
                setMainColor(e.value!)
                console.log({
                  color: e.value!
                })
              }
            }}
          />
          <InputText
            id='MainColorInput'
            value={mainColor as string}
            keyfilter={/^[0-9A-F]{6}[0-9a-f]{0,2}$/i}
            onChange={(e) => {
              if (e.target.value) {
                setMainColor(e.target.value)
              }
            }}
          />
        </article>
        <Button
          id='StyleGenerateButton'
          label='Generar css'
          onClick={() => {
            setVisible(true)
          }}
        />
      </section>
      <Dialog
        onHide={() => setVisible(false)}
        visible={visible}
        header={<h1>Estilos custom</h1>}
        footer={(
          <>
            <Button
              id='DialogCloseButton'
              label='Cerrar'
              onClick={() => {
                setVisible(false)
              }}
            />
            <Button
              id='DialogGenerateButton'
              label='Generar'
              onClick={() => {
                downloadFile()
              }}
            />
          </>
        )}
      >
        <h2>Preview</h2>
        <CodeBlock
          text={code}
          language='css'
          theme={dracula}
        />
      </Dialog>
    </PrimeReactProvider>
  )
}

export default App
