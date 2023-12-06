import React from 'react'

export default function InputForm({ descripcion, tipo, id, modificador, valor, color, placeholder }) {
  return (
    <>
      <div className="m-auto space-y-2 w-4/5 md:w-2/5 mb-2">
        <label htmlFor={`${id}`} className="font-bold text-xl">{descripcion}</label>
        <div className="sombra-aloha rounded-xl h-16 bg-white flex justify-center">
          <input
            id={`${id}`}
            type={tipo}
            className={`px-3 w-full rounded-xl mt-0.5 bg-transparent h-16 ${color}`}
            value={valor}
            onChange={e => modificador(e.target.value)}
            placeholder={placeholder}
          />
        </div>
      </div>
    </>
  )
}
