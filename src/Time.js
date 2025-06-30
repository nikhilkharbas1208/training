import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const DelayedComponent=()=> {
  const{t,i18n} = useTranslation("global")

  const changeLang = (lang)=>{
    i18n.changeLanguage(lang)
  }
  return (
    <>
      <button onClick={()=>changeLang("en")} className='m-2'>en</button>
      <button onClick={()=>changeLang("tl")}  className='m-2'>tl</button>
      <h1>{t("header")}</h1>
    </>
  );
}
