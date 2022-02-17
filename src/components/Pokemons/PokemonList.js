import React, {Fragment, useEffect} from 'react';
import {Alert, Button, Col, message, Row, Spin, Table} from "antd";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import useFetch from "../../utils/useFetch";
import getData, {deleteItem} from "../../utils/api";

const PokemonList = (
    {
        pokemons = [],
        setPokemons,
        setIsModalVisible,
        setIdPokemonToEdit
    }) => {

    const {data, status, error} = useFetch(
        "https://pokemon-pichincha.herokuapp.com/pokemons"
    );

    useEffect(() => {
        setPokemons(data);
    }, [data]);

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Imagen',
            dataIndex: 'image',
            key: 'image',
            render: (text) => <img src={text} width="100" height="100" alt="Img loss!!!"/>
        },
        {
            title: 'Ataque',
            dataIndex: 'attack',
            key: 'attack',
        },
        {
            title: 'Acciones',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) =>
                <div>
                    <Row>
                        <Col span={2}>
                            <Button
                                onClick={() => {
                                    setIsModalVisible(true);
                                    setIdPokemonToEdit(record.id);
                                }}
                            >
                                {<EditOutlined/>}
                            </Button>

                        </Col>
                        <Col span={2} offset={6}>
                            <Button onClick={() => {
                                deleteItem(`https://pokemon-pichincha.herokuapp.com/pokemons/${record.id}`)
                                    .then(resp => {
                                        message.info(`Pokemon eliminado`);
                                        getData("https://pokemon-pichincha.herokuapp.com/pokemons")
                                            .then(resp => {
                                                setPokemons(resp);
                                            })
                                    })
                                    .catch(error => {
                                        message.error(`Error al eliminar el Pokemon seleccionado`);
                                    });
                            }
                            }>
                                {<DeleteOutlined/>}
                            </Button>
                        </Col>
                    </Row>
                </div>
        },
    ];

    if (status === "error") {
        return (
            <Row>
                <Col span={12} offset={6} className="title-pokemon">
                    <Alert
                        message="Error"
                        description={error.message}
                        type="error"
                        showIcon
                    />
                </Col>
            </Row>
        );
    }
    if (status === "loading") {
        return (
            <Row>
                <Col span={12} offset={6} className="new-pokemon">
                    <Spin className="new-pokemon" tip="Loading..."/>
                </Col>
            </Row>);
    }
    return (
        <Fragment>
            <Row>
                <Col span={12} offset={6} className="title-pokemon">
                    <Table
                        dataSource={pokemons}
                        columns={columns}
                        pagination={{pageSize: 2}}
                    />
                </Col>
            </Row>
        </Fragment>
    );
};

export default PokemonList;