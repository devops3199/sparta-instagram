import React, { useEffect, useCallback } from 'react';
import _ from 'lodash';
import Spinner from '../components/Spinner';

const InfinityScroll = (props) => {

    const {callNext, is_next, loading} = props;

    const _handleScroll = _.throttle(() => {

        if(loading){
            return;
        }

        const {innerHeight} = window;
        const {scrollHeight} = document.body;

        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

        if(scrollHeight - innerHeight - scrollTop < 200){
            callNext();
        }
        
    }, 300);

    const handleScroll = useCallback(_handleScroll, [loading]); // 메모이제이션

    useEffect(() => {

        if(loading){
            return;
        }

        if(is_next){
            window.addEventListener('scroll', handleScroll);
        } else {
            window.removeEventListener('scroll', handleScroll);
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, [is_next, loading]); // is_next 값이 변경될때마다 실행

    return (
        <>
            {props.children}
            {is_next && (<Spinner/>)}
        </>
    );
};

InfinityScroll.defaultProps = {
    children: null,
    callNext: () => {},
    is_next: false,
    loading: false,
};

export default InfinityScroll;