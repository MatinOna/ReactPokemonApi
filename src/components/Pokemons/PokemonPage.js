import React, {Fragment, useState} from 'react';
import HeaderPage from "./HeaderPage";
import PokemonList from "./PokemonList";
import PokemonNew from "./PokemonNew";
import PokemonEditPage from "./PokemonEditPage";

const PokemonPage = () => {

    const [pokemons, setPokemons] = useState([]);
    const [newVisible, setNewVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [idPokemonToEdit, setIdPokemonToEdit] = useState(null);

    return (
        <Fragment>
            <HeaderPage
                pokemons={pokemons}
                setPokemons={setPokemons}
                newVisible={newVisible}
                setNewVisible={setNewVisible}
            />
            <PokemonList
                pokemons={pokemons}
                setPokemons={setPokemons}
                setIsModalVisible={setIsModalVisible}
                setIdPokemonToEdit={setIdPokemonToEdit}
            />
            { newVisible && (
                <PokemonNew
                    setNewVisible={setNewVisible}
                    setPokemons={setPokemons}
                />
            )}
            {isModalVisible && (
                <PokemonEditPage
                    isModalVisible={isModalVisible}
                    setIsModalVisible={setIsModalVisible}
                    idPokemonToEdit={idPokemonToEdit}
                    setPokemons={setPokemons}
                />
            )}
        </Fragment>
    );
};

export default PokemonPage;