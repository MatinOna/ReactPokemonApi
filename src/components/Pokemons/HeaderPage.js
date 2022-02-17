import React, {
    Fragment
} from 'react';
import {Row, Col, Input, Button, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import getData from "../../utils/api";

const {Search} = Input;

const HeaderPage = (
    {
        pokemons = [],
        setPokemons,
        newVisible = true,
        setNewVisible}) =>
{

    const onSearch = (value) => {
        const foundPokemon = pokemons?.filter(p => p.name.toUpperCase() === value.toUpperCase());
        if (foundPokemon.length > 0) {
            setPokemons(foundPokemon);
            message.info(`Pokemon disponible`);
        } else {
            getData("https://pokemon-pichincha.herokuapp.com/pokemons")
                .then(resp => {
                    setPokemons(resp);
                })
            message.error(`Pokemon no registrado`);
        }
    };

    return (
        <Fragment>
            <Row>
                <Col span={6} offset={6} className="title-pokemon">
                    <span>Listado de Pokemon</span>
                </Col>

            </Row>
            <Row>
                <Col span={10} offset={6} className="title-pokemon">
                    <Search onSearch={onSearch} placeholder="Nombre" style={{width: 200}}/>
                </Col>
                <Col span={6} className="title-pokemon">
                    <Button
                        onClick={() => setNewVisible(v => !v)}
                        disabled={newVisible}
                        type="primary"
                        icon={<PlusOutlined/>}>
                        <span className="btn-new">Nuevo</span>
                    </Button>
                </Col>
            </Row>
        </Fragment>
    );
};

export default HeaderPage;