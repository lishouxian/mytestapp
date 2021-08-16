import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home'
import styled from 'styled-components';
import {Layout} from "antd";


const HEADER_HEIGHT = 55;
const StyledLayout = styled(Layout)`
  height: 100%;
    .layout__header {
        position: sticky;
        top: 0;
        display: flex;
        height: ${HEADER_HEIGHT}px;
        padding: 0 24px 0 24px;
        line-height: ${HEADER_HEIGHT}px;
        background: #fff;
        box-shadow: 0 0 5px rgba(0, 0, 0, .2);
        align-items: center;
        justify-content: flex-end;
        z-index: 2;
        &-lang {
            margin-right: 12px;
        }

        &-avatar {
            margin-right: 8px;
        }
    }
    .layout__main {
        display: flex;
        flex-direction: column;
    }
    .layout__container {
        display: flex;
        flex-direction: column;
        //background-color: #fff; 
        padding: 24px; 
        margin: 24px;
        min-height: auto;
        position: relative;
        z-index: 1;
    }
    .brand {
        width: 100%;
        height: ${HEADER_HEIGHT}px;
        padding: 0 24px;
        color: #fff;
        margin: 0; 
        display: flex; 
        align-items: center;
        white-space: nowrap;

        &.collapsed {
            justify-content: center;
        }

        &.collapsed .brand__name {
            display: none;
        }

        &__logo {
            width: ${HEADER_HEIGHT - 20}px;
        }

        &__name {
            margin-left: 8px;
        }
    }
`;

ReactDOM.render(
      <StyledLayout>
          <Layout>
              <div className="layout__container">
                  <Home />
              </div>
          </Layout>
      </StyledLayout>,

  document.getElementById('root')
);


