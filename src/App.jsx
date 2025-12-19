import React from 'react';
import { Item } from './Item';

const data = Array(30).fill('*').map((_, index) => index);

export const App = () => {
    return (
        <div>
            <ul>
                {data.map((item) => (
                    <Item 
                        key={item} 
                        index={item} 
                    />
                ))}
            </ul>
        </div>
    )
}