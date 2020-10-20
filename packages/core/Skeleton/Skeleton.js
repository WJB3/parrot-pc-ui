
import React ,{useContext} from 'react';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import Element from './Element';
import Title from './Title';
import Paragraph from './Paragraphy';
import classNames from '@packages/utils/classNames';
import capitalize from '@packages/utils/capitalize';
import "./index.scss";

function getAvatarBasicProps(hasTitle,hasParagraph){

    if(hasTitle && !hasParagraph){
        return {size:"large",shape:"square"}
    }
    return {size:"large",shape:"circle"}
}

function getTitleBasicProps(hasAvatar,hasParagraph){

    if(!hasAvatar && hasParagraph){
        return {width:"38%"}
    }

    if(hasAvatar && hasParagraph){
        return {width:"50%"}
    }

    return {};
}

function getParagraphBasicProps(hasAvatar,hasTitle){
    const basicProps={};

    if(!hasAvatar || !hasTitle){
        basicProps.width="60%";
    }

    if(!hasAvatar && hasTitle){
        basicProps.rows=3;
    }else{
        basicProps.rows=2;
    }

    return basicProps;
}

function getComponentProps(props){
    if(props && typeof props==="object"){
        return props;
    }
    return {};
}


const Skeleton=(props)=>{
    const {
        prefixCls:customizePrefixCls,
        className,
        children,
        loading,
        avatar,
        title=true,
        paragraph=true,
        animation="pluse"
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Skeleton",customizePrefixCls);

    if(loading||!('loading' in props)){
        //如果loading为true或者不存在loading属性时
        const hasAvatar=!!avatar;
        const hasTitle=!!title;
        const hasParagraphy=!!paragraph;

        let avatarNode;
        if(hasAvatar){
            const avatarProps={
                prefixCls:`${prefixCls}-Avatar`,
                ...getAvatarBasicProps(hasTitle,hasParagraphy),
                ...getComponentProps(avatar)
            }
            avatarNode=(
                <div className={classNames(`${prefixCls}-Header`)}>
                    <Element {...avatarProps} />
                </div>
            )
        }

        let contentNode;
        if(hasTitle || hasParagraphy){
            let titleNode;
            if(hasTitle){
                const titleProps={
                    prefixCls:`${prefixCls}-Title`,
                    ...getTitleBasicProps(hasAvatar,hasParagraphy),
                    ...getComponentProps(title)
                }

                titleNode=<Title {...titleProps}/>
            }
            let paragraphNode;
            if(hasParagraphy){
                const paragraphProps={
                    prefixCls:`${prefixCls}-Paragraph`,
                    ...getParagraphBasicProps(hasAvatar,hasTitle),
                    ...getComponentProps(paragraph)
                }

                paragraphNode=<Paragraph {...paragraphProps}/>
            }

            contentNode=(
                <div className={`${prefixCls}-Content`}>
                    {titleNode}
                    {paragraphNode}
                </div>
            )
        }

        return (
            <div className={classNames(prefixCls,className,{
                [`${prefixCls}-HasAvatar`]:hasAvatar,
                [`${prefixCls}-Animation-${capitalize(animation)}`]:animation

            })}>
                {avatarNode}
                {contentNode}
            </div>
        )
    }

    return children;
 
}

export default Skeleton; 


























 