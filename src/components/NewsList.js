// API 요청, 뉴스 데이터 배열 변환
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import NewsItem from './NewsItem';

const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    
    @media screen and (max-width: 768px) {
        width: 100%;
        padding: 0 1rem;
    }
`

const NewsList = ({ category }) => {

    const [articles, setArticles] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(()=> {
        const fetchData = async () => {
            setLoading(true)
            try {
                const query = category === 'all' ? '' : `&category=${category}`
                const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=c2e5ae113eb541cfbcf02f124cdeab1b`,
                )
                setArticles(response.data.articles)
            } catch(e) {
                console.log(e)
            }
            setLoading(false)
        }
        fetchData()
    }, [category])
    // Loading 
    if (loading) {
        return <NewsListBlock>Loading...</NewsListBlock>
    }
    // articles 값이 설정되지 않았을 때
    if (!articles) {
        return null
    }
    // articles 값이 있을 때
    return (
        <NewsListBlock>
            {
                articles.map(article => (
                    <NewsItem key={articles.url} article={article}/>
                ))
            }
        </NewsListBlock>
    );
};

export default NewsList;