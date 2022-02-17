import React, {Fragment} from 'react';
import {
    Button,
    Col,
    Form,
    Input, message,
    Row,
    Slider,

} from "antd";
import {SaveOutlined, CloseOutlined} from '@ant-design/icons';
import getData, {createItem} from "../../utils/api";


const PokemonNew = ({setNewVisible, setPokemons}) => {

    const types = ["water", "fire", "normal", "bug", "poison"];

    const onFinish = (values) => {

        const item = {
            "name": values.name,
            "image": values.image,
            "type": types[Math.floor(Math.random() * types.length)],
            "hp": 99,
            "attack": values.attack,
            "defense": values.defense,
            "idAuthor": 1,
            "created_at": new Date().toDateString()
        }
        createItem(
            "https://pokemon-pichincha.herokuapp.com/pokemons/?idAuthor=1",
            item
        ).then(resp => {
            message.info(`Pokemon creado exitosamente`);
            getData("https://pokemon-pichincha.herokuapp.com/pokemons")
                .then(resp => {
                    setPokemons(resp);
                    setNewVisible(v => !v)
                })
        }).catch(error => {
                message.error(`Error al guardar el Pokemon`);
            });
    };

    return (
        <Fragment>
            <Form
                layout="horizontal"
                onFinish={onFinish}
            >
                <Row className="new-pokemon">
                    <Col span={12} offset={6}>
                        <span>Nuevo Pokemon</span>
                    </Col>
                </Row>

                <Row>
                    <Col span={4} offset={6}>
                        <Form.Item label="Nombre" name="name" rules={[{
                            required: true
                        }]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={4} offset={4}>
                        <Form.Item label="Ataque" name="attack">
                            <Slider defaultValue={0}/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row className="vertical-form">
                    <Col span={4} offset={6}>
                        <Form.Item label="Imagen" name="img">
                            <Input placeholder="URL"/>
                        </Form.Item>
                    </Col>
                    <Col span={4} offset={4}>
                        <Form.Item label="Defensa" name="defense">
                            <Slider defaultValue={0}/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={2} offset={10}>
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined/>}>
                            Guardar
                        </Button>
                    </Col>
                    <Col span={2}>
                        <Button type="primary" onClick={() => setNewVisible(v => !v)} icon={<CloseOutlined/>}>
                            Cancelar
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Fragment>
    );
};

export default PokemonNew;