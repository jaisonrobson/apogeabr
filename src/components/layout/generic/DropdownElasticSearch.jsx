import React, { useState, useEffect } from "react"
import axios from 'axios'

const SearchDropdown = () => {
  const [query, setQuery] = useState("") // Valor digitado
  const [results, setResults] = useState([]) // Resultados da pesquisa
  const [loading, setLoading] = useState(false) // Estado de carregamento
  const [selectedItem, setSelectedItem] = useState(null) // Item selecionado

  useEffect(() => {
    // Função para buscar resultados
    const fetchResults = async () => {
      if (query.length < 2) {
        setResults([])
        return
      }

      setLoading(true)
      try {
        const response = await axios.request({
            url: `${process.env.REACT_APP_BACKEND_HOST}/icon_translations/search?query=${query}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })

        setResults(response.data)
      } catch (error) {
        console.error("Erro ao buscar traducoes de icones:", error)
      }
      setLoading(false)
    }

    // Debounce: Espera 500ms após a última digitação para buscar
    const delayDebounce = setTimeout(() => {
      if (query) {
        fetchResults()
      }
    }, 500)

    return () => clearTimeout(delayDebounce)
  }, [query])

  // Manipular clique em um item
  const handleSelectItem = (item) => {
    setQuery(item.name) // Define o nome do item no input
    setSelectedItem(item) // Armazena o item selecionado
    setResults([]) // Esconde os resultados
  }

  return (
    <div className="relative w-64">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar icones..."
        className="w-full p-2 border rounded-md"
      />
      {loading && <div className="absolute top-10 left-2 text-gray-500">Carregando...</div>}
      {results.length > 0 && (
        <ul className="absolute w-full border rounded-md bg-white mt-1 max-h-60 overflow-y-auto shadow-md">
          {results.map((item) => (
            <li
              key={item.composite_id}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelectItem(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
      {selectedItem && (
        <div className="mt-2 text-sm text-gray-700">
          <strong>Selecionado:</strong> {selectedItem.name}
        </div>
      )}
    </div>
  )
}

export default SearchDropdown
