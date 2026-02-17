function debounce(callback, delay) {
    let timer;
    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value);
        }, delay);
    };
}

import { useState, useEffect } from 'react';

import './searchbar.css'

export default function SearchBar() {

    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);

    const eseguiFetch = debounce((query) => {
        if (query.trim()) {
            fetch(`http://localhost:3333/products?search=${query}`)
                .then(res => res.json())
                .then(data => setResult(data))
                .catch(err => console.error(err))
        } else {
            setResult([])
        }
    }, 500);

    useEffect(() => {
        eseguiFetch(query);
    }, [query])

    return (
        <>
            <input type='text'
                onChange={(e) => setQuery(e.target.value)} />

            {result.map((product) => {
                return (
                    <div key={product.id} className='suggestions'>
                        <h5>{product.name}</h5>
                    </div>
                )
            })}
        </>
    )
}