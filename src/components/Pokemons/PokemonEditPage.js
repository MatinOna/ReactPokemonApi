import React, {useEffect, useState} from 'react';
import { Modal } from 'antd';
import useFetch from "../../utils/useFetch";
import {Alert, Button, Col, Form, Input, message, Row, Select, Slider, Spin} from "antd";
import {SaveOutlined} from "@ant-design/icons";
import getData, {editItem} from "../../utils/api";
const { Option } = Select;

const PokemonEditPage = (
    {
        isModalVisible,
        setIsModalVisible,
        idPokemonToEdit,
        setPokemons
    }) => {

    const [pokemonToEdit, setPokemonToEdit] = useState({});

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = (values) => {

        const item = {
            "name": values.name,
            "image": values.image,
            "type": values.type,
            "hp": values.hp,
            "attack": values.attack,
            "defense": values.defense,
            "idAuthor": 1,
            "updated_at": new Date().toDateString()
        }
        editItem(
            `https://pokemon-pichincha.herokuapp.com/pokemons/${idPokemonToEdit}`,
            item
        ).then(r => {
            message.info(`Pokemon editado exitosamente`);
            getData("https://pokemon-pichincha.herokuapp.com/pokemons")
                .then(resp => {
                    setPokemons(resp);
                })
        }).catch(error => {
            message.error(`Error al editar el Pokemon`);
        });
        setIsModalVisible(false);
    };

    const {data, status, error} = useFetch(
        `https://pokemon-pichincha.herokuapp.com/pokemons/${idPokemonToEdit}`
    );

    useEffect(() => {
        setPokemonToEdit(data);
    }, [data]);


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
        <Modal
            title="Edita a tu Pokemon"
            visible={isModalVisible}
            footer={null}
            onCancel={handleCancel}
        >
            <Form
                layout="horizontal"
                initialValues={pokemonToEdit}
                onFinish={onFinish}
            >
                <Row>
                    <Col span={4} offset={10}>
                        <img src={pokemonToEdit.image} width="100" height="100" alt=":("/>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <Form.Item label="Nombre" name="name" rules={[{
                            required: true
                        }]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Imagen" name="image">
                            <Input placeholder="URL"/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="HP" name="hp">
                            <Slider/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Ataque" name="attack">
                            <Slider/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Defensa" name="defense">
                            <Slider/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="type"
                            label="Tipo"
                            hasFeedback
                        >
                            <Select placeholder="Seleccione un tipo">
                                <Option value="water">Water</Option>
                                <Option value="fire">Fire</Option>
                                <Option value="normal">Normal</Option>
                                <Option value="bug">Bug</Option>
                                <Option value="poison">Poison</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={2} offset={10}>
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined/>}>
                            Guardar
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default PokemonEditPage;