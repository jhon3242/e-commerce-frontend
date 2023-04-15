import React, {useEffect, useState} from 'react';
import Items from "./Items";
import {Container, Row, Col} from "react-bootstrap";
import {initItems, orderItem} from "../../store/itemSlice";
import useAsync from "../../hooks/useAsync";
import {getItemsApi} from "../../api";
import {useDispatch, useSelector} from "react-redux";
import SelectStyles from "../styles/Select.styles";
import Loading from "../etcPage/Loading";
import useTranslate from "../../hooks/useTranslate";

function ListPage() {
    const [isPending, error, getItemApiAsync] = useAsync(getItemsApi);
    const dispatch = useDispatch();
    const translate = useTranslate();

    useEffect(() => {
        async function fetchData() {
            const items = await getItemApiAsync();
            dispatch(initItems(items));
            dispatch(orderItem("recommend"));
        }
        fetchData();
    }, []);

    const handleSelect = async (e : React.ChangeEvent<HTMLInputElement>) => {
        dispatch(orderItem(e.target.value));
    }

    return (
        <>
            <Container >
                <Row className="justify-content-md-center" style={{marginBottom : "30px", padding : "10px"}}>
                    <Col xs={20} md={9}></Col>
                    <Col xs={1} md={1}>
                        <SelectStyles onChange={handleSelect} >
                            <option value={"recommend"}>{translate("order recommend")}</option>
                            <option value={"price-ascending"}>{translate("order low price")}</option>
                            <option value={"price-descending"}>{translate("order high price")}</option>
                            <option value={"id"}>{translate("order new")}</option>
                        </SelectStyles>
                    </Col>
                </Row>
                {isPending && <Loading/>}
                <Items />
            </Container>
        </>
    );
}

export default ListPage;