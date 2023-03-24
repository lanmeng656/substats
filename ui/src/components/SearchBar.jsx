/*
 * @Description:
 * @Autor: fage
 * @Date: 2022-07-26 14:52:51
 * @LastEditors: lanmeng656 lanmeng656@google.com
 * @LastEditTime: 2023-02-14 15:29:05
 * @description: about
 * @author: chenbinfa
 */
import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  DatePicker,
  Table,
  Input,
  Row,
  Select,
  message,
  Modal,
} from "antd";
import {
  SearchOutlined,
  RedoOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import storageAJAX from "@services/storage";
import _ from "lodash";
import moment from "moment";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import webconfig from "@/webconfig";

const { Option } = Select;
const { Search } = Input;
let ignore = false;
let keyword2="";

const SearchBar = ({ className }) => {
  const [keyword, setKeyword] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchType, setSearchType] = useState("All");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let pathArr = window.location.pathname.split("/");
    if (pathArr.length == 3) {
      let type = pathArr[1];
      let v = pathArr[2];
      if (type == "block") {
        type = "Block";
      } else if (type == "transfer") {
        type = "Transfer";
      } else if (type == "account") {
        type = "Account";
      } else {
        type = "All";
      }
      setSearchType(type);
      setKeyword(v);
      keyword2=v;
    }
    document.onkeydown = function (event) {
      console.log('event.keyCode',event.keyCode);
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if (e && e.keyCode == 13) {
        // enter 键
        //要做的事情   
        let v=document.getElementById("searchInput").value;
        if(!v){
          return;
        }
        setKeyword(v);
        keyword2=v; 
        onSearch(event);
      }
    };
  }, []);

  const onSearch = (e) => {
    let type = getSearchType();
    if(!type) return console.log('keyword is null');
    let url = "/" + type.toLowerCase() + "/" + keyword2;
    navigate(url);
  };
  const getSearchType = () => {
    let type = "Transfer";    
    if (keyword2.length == 48) {
      type = "Account";
    } else if (keyword2.length < 15 && !isNaN(keyword2)) {
      type = "Block";
    }
    return type;
  };
  const onChangeKeyword = (e) => {
    setKeyword(e.target.value);
    keyword2=e.target.value
  };

  return (
    <div className={className}>
      <div className="search-content">
        <div className="big-title block">
          <div className="big-title-txt block">
            The {webconfig.name} Blockchain Explorer
          </div>
        </div>
        <div className="search-input">
          <input
          id="searchInput"
            type="text"
            placeholder="Block Height/Transaction Hash/Account"
            onChange={onChangeKeyword}
            onKeyPress={onChangeKeyword}
            onKeyUp={onChangeKeyword}
            onInput={onChangeKeyword}
          />
          <span onClick={onSearch}>Search</span>
        </div>
        {/* <Search
          className="search-box"
          placeholder="Block Height/Transaction Hash/Account"
          onSearch={onSearch}
          onPressEnter={onSearch}
          allowClear
          value={keyword}
          bordered={false}
          width="100%"
          onChange={onChangeKeyword}
          style={{
            borderRadius: "10px",
            border: "1px solid #ddd",
            backgroundColor: "#fff",
            overflow: "hidden",
            width: "100%",
          }}
          id="searchInput"
          size="large"
        /> */}
      </div>
    </div>
  );
};

export default React.memo(styled(SearchBar)`
  background-color: var(--theme-color);
  width: 100%;
  display: block;
  overflow: hidden;
  .search-content {
    width: 70%;
    display: block;
    overflow: hidden;
    margin: 50px auto;
    max-width: 910px;
  }
  .search-input {
    position: relative;
    top: 0;
    left: 0;
    overflow: "hidden";
    width: "100%";
    input {
      border: 1px solid #424242;
      border-radius: 8px;
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-indent: 8px;
      outline: none;
    }
    span {
      position: absolute;
      top: 3px;
      right: 3px;
      background-color: #333;
      color: #fff;
      border-radius: 6px;
      width: 126px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      cursor: default;
    }
  }
  @media screen and (max-width: 900px) {
    .top-price-btn {
      position: relative !important;
      width: 100% !important;
      margin: 20px auto 0;
      padding: 5px 10px;
    }
  }
  .search-box {
    max-width: 700px;
  }
  .big-title {
    font-family: "Microsoft YaHei";
    .big-title-txt {
      font-size: 23px;
      color: #fff;
      font-weight: bold;
      line-height: 50px;
    }
  }
  .ant-input-group-addon button {
    border: none !important;
    color: rgb(69 148 255) !important;
  }
`);
