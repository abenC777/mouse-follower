import { useEffect, useState } from 'react'
import './App.css'

function App () {
  const [enabled, setEnabled] = useState(false)
  const [noCursor, setNoCursor] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  /* This `useEffect` hook is responsible for adding and removing an event listener for the `pointermove`
event on the `window` object based on the value of the `enabled` state variable. If `enabled` is
`true`, the `handleMove` function is added as an event listener for `pointermove`. This function
logs the `clientX` and `clientY` properties of the event object and sets the `position` state
variable to an object with those values. If `enabled` is `false`, the `handleMove` function is
removed as an event listener for `pointermove`. The second argument of the `useEffect` hook,
`[enabled]`, specifies that this effect should only be re-run if the value of `enabled` changes. */
  useEffect(() => {
    console.log('effect', enabled)

    const handleMove = (event) => {
      const { clientX, clientY } = event
      // console.log('handleMove', { clientX, clientY })
      setPosition({ x: clientX, y: clientY })
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  /* This `useEffect` hook is responsible for toggling the `no-cursor` class on the `body` element of
 the HTML document based on the value of the `noCursor` state variable. If `noCursor` is `true`, the
 `no-cursor` class is added to the `body` element, and if it is `false`, the class is removed. The
 second argument of the `useEffect` hook, `[noCursor]`, specifies that this effect should only be
 re-run if the value of `noCursor` changes. The returned function removes the `no-cursor` class from
 the `body` element when the component unmounts. */
  useEffect(() => {
    document.body.classList.toggle('no-cursor', noCursor)

    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [noCursor])

  return (
    <main>
      <ul className={enabled ? 'circles' : 'hidden'}>
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
      </ul>
      <div
        style={{
          position: 'absolute',
          backgroundColor: '#09f',
          borderRadius: '50%',
          border: '3px dashed purple',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -20,
          top: -20,
          width: 40,
          height: 40,
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />
      <div className='button-container'>
        <button onClick={() => setEnabled(!enabled)}>
          {enabled ? 'Desactivar' : 'Activar'} seguir puntero.
        </button>
        <button onClick={() => setNoCursor(!noCursor)}>
          {noCursor ? 'Aparecer el' : 'Esconder el'} puntero.
        </button>
      </div>
    </main>
  )
}

export default App
