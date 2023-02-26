/* eslint-disable react/no-unknown-property */
import React from 'react';

const Template = (): JSX.Element => {
  return (
    <>
      <style jsx={true}>
        {`
          h1,
          ol,
          ul,
          li,
          button {
            margin: 0;
            padding: 0;
          }

          button {
            border: none;
            background: none;
          }

          body {
            background: #fff;
          }

          body,
          input,
          button {
            font-size: 14px;
            font-family: arial, sans-serif;
            color: #202124;
          }

          a {
            color: #1a0dab;
            text-decoration: none;
          }

          a:hover,
          a:active {
            text-decoration: underline;
          }

          a:visited {
            color: #681da8;
          }

          html,
          body {
            min-width: 400px;
          }

          body,
          html {
            height: 100%;
            margin: 0;
            padding: 0;
          }

          .gb_7a:not(.gb_Od) {
            font: 13px/27px Roboto, Arial, sans-serif;
            z-index: 986;
          }

          @-webkit-keyframes gb__a {
            0% {
              opacity: 0;
            }

            50% {
              opacity: 1;
            }
          }

          @keyframes gb__a {
            0% {
              opacity: 0;
            }

            50% {
              opacity: 1;
            }
          }

          a.gb_ea {
            border: none;
            color: #4285f4;
            cursor: default;
            font-weight: bold;
            outline: none;
            position: relative;
            text-align: center;
            text-decoration: none;
            text-transform: uppercase;
            white-space: nowrap;
            -webkit-user-select: none;
          }

          a.gb_ea:hover:after,
          a.gb_ea:focus:after {
            background-color: rgba(0, 0, 0, 0.12);
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;
          }

          a.gb_ea:hover,
          a.gb_ea:focus {
            text-decoration: none;
          }

          a.gb_ea:active {
            background-color: rgba(153, 153, 153, 0.4);
            text-decoration: none;
          }

          a.gb_fa {
            background-color: #4285f4;
            color: #fff;
          }

          a.gb_fa:active {
            background-color: #0043b2;
          }

          .gb_ga {
            -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.16);
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.16);
          }

          .gb_ea,
          .gb_fa,
          .gb_ha,
          .gb_ia {
            display: inline-block;
            line-height: 28px;
            padding: 0 12px;
            -webkit-border-radius: 2px;
            border-radius: 2px;
          }

          .gb_ha {
            background: #f8f8f8;
            border: 1px solid #c6c6c6;
          }

          .gb_ia {
            background: #f8f8f8;
          }

          .gb_ha,
          #gb a.gb_ha.gb_ha,
          .gb_ia {
            color: #666;
            cursor: default;
            text-decoration: none;
          }

          #gb a.gb_ia.gb_ia {
            cursor: default;
            text-decoration: none;
          }

          .gb_ia {
            border: 1px solid #4285f4;
            font-weight: bold;
            outline: none;
            background: #4285f4;
            background: -webkit-linear-gradient(top, #4387fd, #4683ea);
            background: linear-gradient(top, #4387fd, #4683ea);
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#4387fd, endColorstr=#4683ea, GradientType=0);
          }

          #gb a.gb_ia.gb_ia {
            color: #fff;
          }

          .gb_ia:hover {
            -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
            box-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
          }

          .gb_ia:active {
            -webkit-box-shadow: inset 0 2px 0 rgba(0, 0, 0, 0.15);
            box-shadow: inset 0 2px 0 rgba(0, 0, 0, 0.15);
            background: #3c78dc;
            background: -webkit-linear-gradient(top, #3c7ae4, #3f76d3);
            background: linear-gradient(top, #3c7ae4, #3f76d3);
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#3c7ae4, endColorstr=#3f76d3, GradientType=0);
          }

          #gb .gb_ka {
            background: #fff;
            border: 1px solid #dadce0;
            color: #1a73e8;
            display: inline-block;
            text-decoration: none;
          }

          #gb .gb_ka:hover {
            background: #f8fbff;
            border-color: #dadce0;
            color: #174ea6;
          }

          #gb .gb_ka:focus {
            background: #f4f8ff;
            color: #174ea6;
            outline: 1px solid #174ea6;
          }

          #gb .gb_ka:active,
          #gb .gb_ka:focus:active {
            background: #ecf3fe;
            color: #174ea6;
          }

          #gb .gb_ka.gb_g {
            background: transparent;
            border: 1px solid #5f6368;
            color: #8ab4f8;
            text-decoration: none;
          }

          #gb .gb_ka.gb_g:hover {
            background: rgba(255, 255, 255, 0.04);
            color: #e8eaed;
          }

          #gb .gb_ka.gb_g:focus {
            background: rgba(232, 234, 237, 0.12);
            color: #e8eaed;
            outline: 1px solid #e8eaed;
          }

          #gb .gb_ka.gb_g:active,
          #gb .gb_ka.gb_g:focus:active {
            background: rgba(232, 234, 237, 0.1);
            color: #e8eaed;
          }

          .gb_j {
            display: none !important;
          }

          .gb_Qa {
            visibility: hidden;
          }

          .gb_nd {
            display: inline-block;
            vertical-align: middle;
          }

          .gb_Df .gb_i {
            bottom: -3px;
            right: -5px;
          }

          .gb_Ef {
            position: relative;
          }

          .gb_e {
            display: inline-block;
            outline: none;
            vertical-align: middle;
            -webkit-border-radius: 2px;
            border-radius: 2px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            height: 40px;
            width: 40px;
            color: #000;
            cursor: pointer;
            text-decoration: none;
          }

          #gb#gb a.gb_e {
            color: #000;
            cursor: pointer;
            text-decoration: none;
          }

          .gb_9a {
            border-color: transparent;
            border-bottom-color: #fff;
            border-style: dashed dashed solid;
            border-width: 0 8.5px 8.5px;
            display: none;
            position: absolute;
            left: 11.5px;
            top: 43px;
            z-index: 1;
            height: 0;
            width: 0;
            -webkit-animation: gb__a 0.2s;
            animation: gb__a 0.2s;
          }

          .gb_ab {
            border-color: transparent;
            border-style: dashed dashed solid;
            border-width: 0 8.5px 8.5px;
            display: none;
            position: absolute;
            left: 11.5px;
            z-index: 1;
            height: 0;
            width: 0;
            -webkit-animation: gb__a 0.2s;
            animation: gb__a 0.2s;
            border-bottom-color: #ccc;
            border-bottom-color: rgba(0, 0, 0, 0.2);
            top: 42px;
          }

          x:-o-prefocus,
          div.gb_ab {
            border-bottom-color: #ccc;
          }

          .gb_O {
            background: #fff;
            border: 1px solid #ccc;
            border-color: rgba(0, 0, 0, 0.2);
            color: #000;
            -webkit-box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            display: none;
            outline: none;
            overflow: hidden;
            position: absolute;
            right: 8px;
            top: 62px;
            -webkit-animation: gb__a 0.2s;
            animation: gb__a 0.2s;
            -webkit-border-radius: 2px;
            border-radius: 2px;
            -webkit-user-select: text;
          }

          .gb_nd.gb_Aa .gb_9a,
          .gb_nd.gb_Aa .gb_ab,
          .gb_nd.gb_Aa .gb_O,
          .gb_Aa.gb_O {
            display: block;
          }

          .gb_nd.gb_Aa.gb_Ff .gb_9a,
          .gb_nd.gb_Aa.gb_Ff .gb_ab {
            display: none;
          }

          .gb_Hf {
            position: absolute;
            right: 8px;
            top: 62px;
            z-index: -1;
          }

          .gb_Wa .gb_9a,
          .gb_Wa .gb_ab,
          .gb_Wa .gb_O {
            margin-top: -10px;
          }

          .gb_nd:first-child,
          #gbsfw:first-child + .gb_nd {
            padding-left: 4px;
          }

          .gb_Ea.gb_Ve .gb_nd:first-child {
            padding-left: 0;
          }

          .gb_We {
            position: relative;
          }

          .gb_Zc .gb_We,
          .gb_5d .gb_We {
            float: right;
          }

          .gb_e {
            padding: 8px;
            cursor: pointer;
          }

          .gb_Ea .gb_fd:not(.gb_ea):focus img {
            background-color: rgba(0, 0, 0, 0.2);
            outline: none;
            -webkit-border-radius: 50%;
            border-radius: 50%;
          }

          .gb_Xe button svg,
          .gb_e {
            -webkit-border-radius: 50%;
            border-radius: 50%;
          }

          .gb_Xe button:focus:not(:focus-visible) svg,
          .gb_Xe button:hover svg,
          .gb_Xe button:active svg,
          .gb_e:focus:not(:focus-visible),
          .gb_e:hover,
          .gb_e:active,
          .gb_e[aria-expanded='true'] {
            outline: none;
          }

          .gb_Ic .gb_Xe.gb_Ze button:focus-visible svg,
          .gb_Xe button:focus-visible svg,
          .gb_e:focus-visible {
            outline: 1px solid #202124;
          }

          .gb_Ic .gb_Xe button:focus-visible svg,
          .gb_Ic .gb_e:focus-visible {
            outline: 1px solid #f1f3f4;
          }

          @media (forced-colors: active) {
            .gb_Ic .gb_Xe.gb_Ze button:focus-visible svg,
            .gb_Xe button:focus-visible svg,
            .gb_Ic .gb_Xe button:focus-visible svg {
              outline: 1px solid currentcolor;
            }
          }

          .gb_Ic .gb_Xe.gb_Ze button:focus svg,
          .gb_Ic .gb_Xe.gb_Ze button:focus:hover svg,
          .gb_Xe button:focus svg,
          .gb_Xe button:focus:hover svg,
          .gb_e:focus,
          .gb_e:focus:hover {
            background-color: rgba(60, 64, 67, 0.1);
          }

          .gb_Ic .gb_Xe.gb_Ze button:active svg,
          .gb_Xe button:active svg,
          .gb_e:active {
            background-color: rgba(60, 64, 67, 0.12);
          }

          .gb_Ic .gb_Xe.gb_Ze button:hover svg,
          .gb_Xe button:hover svg,
          .gb_e:hover {
            background-color: rgba(60, 64, 67, 0.08);
          }

          .gb_ya .gb_e.gb_0a:hover {
            background-color: transparent;
          }

          .gb_e[aria-expanded='true'],
          .gb_e:hover[aria-expanded='true'] {
            background-color: rgba(95, 99, 104, 0.24);
          }

          .gb_e[aria-expanded='true'] .gb_0e,
          .gb_e[aria-expanded='true'] .gb_1e {
            fill: #5f6368;
            opacity: 1;
          }

          .gb_Ic .gb_Xe button:hover svg,
          .gb_Ic .gb_e:hover {
            background-color: rgba(232, 234, 237, 0.08);
          }

          .gb_Ic .gb_Xe button:focus svg,
          .gb_Ic .gb_Xe button:focus:hover svg,
          .gb_Ic .gb_e:focus,
          .gb_Ic .gb_e:focus:hover {
            background-color: rgba(232, 234, 237, 0.1);
          }

          .gb_Ic .gb_Xe button:active svg,
          .gb_Ic .gb_e:active {
            background-color: rgba(232, 234, 237, 0.12);
          }

          .gb_Ic .gb_e[aria-expanded='true'],
          .gb_Ic .gb_e:hover[aria-expanded='true'] {
            background-color: rgba(255, 255, 255, 0.12);
          }

          .gb_Ic .gb_e[aria-expanded='true'] .gb_0e,
          .gb_Ic .gb_e[aria-expanded='true'] .gb_1e {
            fill: #fff;
            opacity: 1;
          }

          .gb_nd {
            padding: 4px;
          }

          .gb_Ea.gb_Ve .gb_nd {
            padding: 4px 2px;
          }

          .gb_Ea.gb_Ve .gb_b.gb_nd {
            padding-left: 6px;
          }

          .gb_O {
            z-index: 991;
            line-height: normal;
          }

          .gb_O.gb_2e {
            left: 8px;
            right: auto;
          }

          @media (max-width: 350px) {
            .gb_O.gb_2e {
              left: 0;
            }
          }

          .gb_3e .gb_O {
            top: 56px;
          }

          .gb_M .gb_e,
          .gb_N .gb_M .gb_e {
            background-position: -64px -29px;
          }

          .gb_s .gb_M .gb_e {
            background-position: -29px -29px;
            opacity: 1;
          }

          .gb_M .gb_e,
          .gb_M .gb_e:hover,
          .gb_M .gb_e:focus {
            opacity: 1;
          }

          .gb_Pd {
            display: none;
          }

          .gb_i {
            display: none;
          }

          .gb_7c {
            font-family: Google Sans, Roboto, Helvetica, Arial, sans-serif;
            font-size: 20px;
            font-weight: 400;
            letter-spacing: 0.25px;
            line-height: 48px;
            margin-bottom: 2px;
            opacity: 1;
            overflow: hidden;
            padding-left: 16px;
            position: relative;
            text-overflow: ellipsis;
            vertical-align: middle;
            top: 2px;
            white-space: nowrap;
            -webkit-flex: 1 1 auto;
            flex: 1 1 auto;
          }

          .gb_7c.gb_8c {
            color: #3c4043;
          }

          .gb_Ea.gb_Fa .gb_7c {
            margin-bottom: 0;
          }

          .gb_9c.gb_ad .gb_7c {
            padding-left: 4px;
          }

          .gb_Ea.gb_Fa .gb_bd {
            position: relative;
            top: -2px;
          }

          .gb_Ea {
            color: black;
            min-width: 320px;
            position: relative;
            -webkit-transition: box-shadow 250ms;
            transition: box-shadow 250ms;
          }

          .gb_Ea.gb_Qc {
            min-width: 240px;
          }

          .gb_Ea.gb_Qd .gb_Rd {
            display: none;
          }

          .gb_Ea.gb_Qd .gb_Sd {
            height: 56px;
          }

          header.gb_Ea {
            display: block;
          }

          .gb_Ea svg {
            fill: currentColor;
          }

          .gb_Td {
            position: fixed;
            top: 0;
            width: 100%;
          }

          .gb_Ud {
            -webkit-box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.14),
              0px 1px 10px 0px rgba(0, 0, 0, 0.12),
              0px 2px 4px -1px rgba(0, 0, 0, 0.2);
            box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.14),
              0px 1px 10px 0px rgba(0, 0, 0, 0.12),
              0px 2px 4px -1px rgba(0, 0, 0, 0.2);
          }

          .gb_Vd {
            height: 64px;
          }

          .gb_Sd {
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            position: relative;
            width: 100%;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            -webkit-box-pack: space-between;
            -webkit-justify-content: space-between;
            justify-content: space-between;
            min-width: -webkit-min-content;
            min-width: min-content;
          }

          .gb_Ea:not(.gb_Fa) .gb_Sd {
            padding: 8px;
          }

          .gb_Ea.gb_Wd .gb_Sd {
            -webkit-flex: 1 0 auto;
            flex: 1 0 auto;
          }

          .gb_Ea .gb_Sd.gb_Xd.gb_Zd {
            min-width: 0;
          }

          .gb_Ea.gb_Fa .gb_Sd {
            padding: 4px;
            padding-left: 8px;
            min-width: 0;
          }

          .gb_Rd {
            height: 48px;
            vertical-align: middle;
            white-space: nowrap;
            -webkit-box-align: center;
            -webkit-align-items: center;
            align-items: center;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            -webkit-user-select: none;
          }

          .gb_1d > .gb_Rd {
            display: table-cell;
            width: 100%;
          }

          .gb_9c {
            padding-right: 30px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            -webkit-flex: 1 0 auto;
            flex: 1 0 auto;
          }

          .gb_Ea.gb_Fa .gb_9c {
            padding-right: 14px;
          }

          .gb_2d {
            -webkit-flex: 1 1 100%;
            flex: 1 1 100%;
          }

          .gb_2d > :only-child {
            display: inline-block;
          }

          .gb_3d.gb_0c {
            padding-left: 4px;
          }

          .gb_3d.gb_4d,
          .gb_Ea.gb_Wd .gb_3d,
          .gb_Ea.gb_Fa:not(.gb_5d) .gb_3d {
            padding-left: 0;
          }

          .gb_Ea.gb_Fa .gb_3d.gb_4d {
            padding-right: 0;
          }

          .gb_Ea.gb_Fa .gb_3d.gb_4d .gb_ya {
            margin-left: 10px;
          }

          .gb_0c {
            display: inline;
          }

          .gb_Ea.gb_Tc .gb_3d.gb_6d,
          .gb_Ea.gb_5d .gb_3d.gb_6d {
            padding-left: 2px;
          }

          .gb_7c {
            display: inline-block;
          }

          .gb_3d {
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            height: 48px;
            line-height: normal;
            padding: 0 4px;
            padding-left: 30px;
            -webkit-flex: 0 0 auto;
            flex: 0 0 auto;
            -webkit-box-pack: flex-end;
            -webkit-justify-content: flex-end;
            justify-content: flex-end;
          }

          .gb_5d {
            height: 48px;
          }

          .gb_Ea.gb_5d {
            min-width: initial;
            min-width: auto;
          }

          .gb_5d .gb_3d {
            float: right;
            padding-left: 32px;
          }

          .gb_5d .gb_3d.gb_7d {
            padding-left: 0;
          }

          .gb_8d {
            font-size: 14px;
            max-width: 200px;
            overflow: hidden;
            padding: 0 12px;
            text-overflow: ellipsis;
            white-space: nowrap;
            -webkit-user-select: text;
          }

          .gb_9d {
            -webkit-transition: background-color 0.4s;
            transition: background-color 0.4s;
          }

          .gb_ae {
            color: black;
          }

          .gb_Ic {
            color: white;
          }

          .gb_Ea a,
          .gb_Nc a {
            color: inherit;
          }

          .gb_C {
            color: rgba(0, 0, 0, 0.87);
          }

          .gb_Ea svg,
          .gb_Nc svg,
          .gb_9c .gb_be,
          .gb_Zc .gb_be {
            color: #5f6368;
            opacity: 1;
          }

          .gb_Ic svg,
          .gb_Nc.gb_Rc svg,
          .gb_Ic .gb_9c .gb_be,
          .gb_Ic .gb_9c .gb_Hc,
          .gb_Ic .gb_9c .gb_bd,
          .gb_Nc.gb_Rc .gb_be {
            color: rgba(255, 255, 255, 0.87);
          }

          .gb_Ic .gb_9c .gb_Fc:not(.gb_ce) {
            opacity: 0.87;
          }

          .gb_8c {
            color: inherit;
            opacity: 1;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
          }

          .gb_Ic .gb_8c,
          .gb_ae .gb_8c {
            opacity: 1;
          }

          .gb_de {
            position: relative;
          }

          .gb_ee {
            font-family: arial, sans-serif;
            line-height: normal;
            padding-right: 15px;
          }

          a.gb_p,
          span.gb_p {
            color: rgba(0, 0, 0, 0.87);
            text-decoration: none;
          }

          .gb_Ic a.gb_p,
          .gb_Ic span.gb_p {
            color: white;
          }

          a.gb_p:focus {
            outline-offset: 2px;
          }

          a.gb_p:hover {
            text-decoration: underline;
          }

          .gb_q {
            display: inline-block;
            padding-left: 15px;
          }

          .gb_q .gb_p {
            display: inline-block;
            line-height: 24px;
            vertical-align: middle;
          }

          .gb_fe {
            font-family: Google Sans, Roboto, Helvetica, Arial, sans-serif;
            font-weight: 500;
            font-size: 14px;
            letter-spacing: 0.25px;
            line-height: 16px;
            margin-left: 10px;
            margin-right: 8px;
            min-width: 96px;
            padding: 9px 23px;
            text-align: center;
            vertical-align: middle;
            -webkit-border-radius: 4px;
            border-radius: 4px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
          }

          .gb_Ea.gb_5d .gb_fe {
            margin-left: 8px;
          }

          #gb a.gb_ia.gb_ia.gb_fe {
            cursor: pointer;
          }

          .gb_ia.gb_fe:hover {
            background: #1b66c9;
            -webkit-box-shadow: 0 1px 3px 1px rgba(66, 64, 67, 0.15),
              0 1px 2px 0 rgba(60, 64, 67, 0.3);
            box-shadow: 0 1px 3px 1px rgba(66, 64, 67, 0.15),
              0 1px 2px 0 rgba(60, 64, 67, 0.3);
          }

          .gb_ia.gb_fe:focus,
          .gb_ia.gb_fe:hover:focus {
            background: #1c5fba;
            -webkit-box-shadow: 0 1px 3px 1px rgba(66, 64, 67, 0.15),
              0 1px 2px 0 rgba(60, 64, 67, 0.3);
            box-shadow: 0 1px 3px 1px rgba(66, 64, 67, 0.15),
              0 1px 2px 0 rgba(60, 64, 67, 0.3);
          }

          .gb_ia.gb_fe:active {
            background: #1b63c1;
            -webkit-box-shadow: 0 1px 3px 1px rgba(66, 64, 67, 0.15),
              0 1px 2px 0 rgba(60, 64, 67, 0.3);
            box-shadow: 0 1px 3px 1px rgba(66, 64, 67, 0.15),
              0 1px 2px 0 rgba(60, 64, 67, 0.3);
          }

          .gb_fe {
            background: #1a73e8;
            border: 1px solid transparent;
          }

          .gb_Ea.gb_Fa .gb_fe {
            padding: 9px 15px;
            min-width: 80px;
          }

          .gb_ge {
            text-align: left;
          }

          #gb .gb_Ic a.gb_fe:not(.gb_g),
          #gb.gb_Ic a.gb_fe {
            background: #fff;
            border-color: #dadce0;
            -webkit-box-shadow: none;
            box-shadow: none;
            color: #1a73e8;
          }

          #gb a.gb_ia.gb_g.gb_fe {
            background: #8ab4f8;
            border: 1px solid transparent;
            -webkit-box-shadow: none;
            box-shadow: none;
            color: #202124;
          }

          #gb .gb_Ic a.gb_fe:hover:not(.gb_g),
          #gb.gb_Ic a.gb_fe:hover {
            background: #f8fbff;
            border-color: #cce0fc;
          }

          #gb a.gb_ia.gb_g.gb_fe:hover {
            background: #93baf9;
            border-color: transparent;
            -webkit-box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.15),
              0 1px 2px rgba(0, 0, 0, 0.3);
            box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.15),
              0 1px 2px rgba(0, 0, 0, 0.3);
          }

          #gb .gb_Ic a.gb_fe:focus:not(.gb_g),
          #gb .gb_Ic a.gb_fe:focus:hover:not(.gb_g),
          #gb.gb_Ic a.gb_fe:focus:not(.gb_g),
          #gb.gb_Ic a.gb_fe:focus:hover:not(.gb_g) {
            background: #f4f8ff;
            outline: 1px solid #c9ddfc;
          }

          #gb a.gb_ia.gb_g.gb_fe:focus,
          #gb a.gb_ia.gb_g.gb_fe:focus:hover {
            background: #a6c6fa;
            border-color: transparent;
            -webkit-box-shadow: none;
            box-shadow: none;
          }

          #gb .gb_Ic a.gb_fe:active:not(.gb_g),
          #gb.gb_Ic a.gb_fe:active {
            background: #ecf3fe;
          }

          #gb a.gb_ia.gb_g.gb_fe:active {
            background: #a1c3f9;
            -webkit-box-shadow: 0 1px 2px rgba(60, 64, 67, 0.3),
              0 2px 6px 2px rgba(60, 64, 67, 0.15);
            box-shadow: 0 1px 2px rgba(60, 64, 67, 0.3),
              0 2px 6px 2px rgba(60, 64, 67, 0.15);
          }

          .gb_ya {
            background-color: rgba(255, 255, 255, 0.88);
            border: 1px solid #dadce0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            cursor: pointer;
            display: inline-block;
            max-height: 48px;
            overflow: hidden;
            outline: none;
            padding: 0;
            vertical-align: middle;
            width: 134px;
            -webkit-border-radius: 8px;
            border-radius: 8px;
          }

          .gb_ya.gb_g {
            background-color: transparent;
            border: 1px solid #5f6368;
          }

          .gb_za {
            display: inherit;
          }

          .gb_ya.gb_g .gb_za {
            background: #fff;
            -webkit-border-radius: 4px;
            border-radius: 4px;
            display: inline-block;
            left: 8px;
            margin-right: 5px;
            position: relative;
            padding: 3px;
            top: -1px;
          }

          .gb_ya:hover {
            border: 1px solid #d2e3fc;
            background-color: rgba(248, 250, 255, 0.88);
          }

          .gb_ya.gb_g:hover {
            background-color: rgba(241, 243, 244, 0.04);
            border: 1px solid #5f6368;
          }

          .gb_ya:focus-visible,
          .gb_ya:focus {
            background-color: rgba(255, 255, 255);
            outline: 1px solid #202124;
            -webkit-box-shadow: 0px 1px 2px 0px rgba(60, 64, 67, 0.3),
              0px 1px 3px 1px rgba(60, 64, 67, 0.15);
            box-shadow: 0px 1px 2px 0px rgba(60, 64, 67, 0.3),
              0px 1px 3px 1px rgba(60, 64, 67, 0.15);
          }

          .gb_ya.gb_g:focus-visible,
          .gb_ya.gb_g:focus {
            background-color: rgba(241, 243, 244, 0.12);
            outline: 1px solid #f1f3f4;
            -webkit-box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.15),
              0 1px 2px 0 rgba(0, 0, 0, 0.3);
            box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.15),
              0 1px 2px 0 rgba(0, 0, 0, 0.3);
          }

          .gb_ya.gb_g:active,
          .gb_ya.gb_Aa.gb_g:focus {
            background-color: rgba(241, 243, 244, 0.1);
            border: 1px solid #5f6368;
          }

          .gb_Ba {
            display: inline-block;
            padding-bottom: 2px;
            padding-left: 7px;
            padding-top: 2px;
            text-align: center;
            vertical-align: middle;
            line-height: 32px;
            width: 78px;
          }

          .gb_ya.gb_g .gb_Ba {
            line-height: 26px;
            margin-left: 0;
            padding-bottom: 0;
            padding-left: 0;
            padding-top: 0;
            width: 72px;
          }

          .gb_Ba.gb_Ca {
            background-color: #f1f3f4;
            -webkit-border-radius: 4px;
            border-radius: 4px;
            margin-left: 8px;
            padding-left: 0;
          }

          .gb_Ba.gb_Ca .gb_Da {
            vertical-align: middle;
          }

          .gb_Ea:not(.gb_Fa) .gb_ya {
            margin-left: 10px;
            margin-right: 4px;
          }

          .gb_Ha {
            max-height: 32px;
            width: 78px;
          }

          .gb_ya.gb_g .gb_Ha {
            max-height: 26px;
            width: 72px;
          }

          .gb_h {
            -webkit-background-size: 32px 32px;
            background-size: 32px 32px;
            border: 0;
            -webkit-border-radius: 50%;
            border-radius: 50%;
            display: block;
            margin: 0px;
            position: relative;
            height: 32px;
            width: 32px;
            z-index: 0;
          }

          .gb_Ra {
            background-color: #e8f0fe;
            border: 1px solid rgba(32, 33, 36, 0.08);
            position: relative;
          }

          .gb_Ra.gb_h {
            height: 30px;
            width: 30px;
          }

          .gb_Ra.gb_h:hover,
          .gb_Ra.gb_h:active {
            -webkit-box-shadow: none;
            box-shadow: none;
          }

          .gb_Sa {
            background: #fff;
            border: none;
            -webkit-border-radius: 50%;
            border-radius: 50%;
            bottom: 2px;
            -webkit-box-shadow: 0px 1px 2px 0px rgba(60, 64, 67, 0.3),
              0px 1px 3px 1px rgba(60, 64, 67, 0.15);
            box-shadow: 0px 1px 2px 0px rgba(60, 64, 67, 0.3),
              0px 1px 3px 1px rgba(60, 64, 67, 0.15);
            height: 14px;
            margin: 2px;
            position: absolute;
            right: 0;
            width: 14px;
          }

          .gb_Ta {
            color: #1f71e7;
            font: 400 22px/32px Google Sans, Roboto, Helvetica, Arial,
              sans-serif;
            text-align: center;
            text-transform: uppercase;
          }

          @media (min-resolution: 1.25dppx),
            (-o-min-device-pixel-ratio: 5/4),
            (-webkit-min-device-pixel-ratio: 1.25),
            (min-device-pixel-ratio: 1.25) {
            .gb_h::before,
            .gb_Ua::before {
              display: inline-block;
              -webkit-transform: scale(0.5);
              transform: scale(0.5);
              -webkit-transform-origin: left 0;
              transform-origin: left 0;
            }

            .gb_u .gb_Ua::before {
              -webkit-transform: scale(0.416666667);
              transform: scale(0.416666667);
            }
          }

          .gb_h:hover,
          .gb_h:focus {
            -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
            box-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
          }

          .gb_h:active {
            -webkit-box-shadow: inset 0 2px 0 rgba(0, 0, 0, 0.15);
            box-shadow: inset 0 2px 0 rgba(0, 0, 0, 0.15);
          }

          .gb_h:active::after {
            background: rgba(0, 0, 0, 0.1);
            -webkit-border-radius: 50%;
            border-radius: 50%;
            display: block;
            height: 100%;
          }

          .gb_Va {
            cursor: pointer;
            line-height: 40px;
            min-width: 30px;
            opacity: 0.75;
            overflow: hidden;
            vertical-align: middle;
            text-overflow: ellipsis;
          }

          .gb_e.gb_Va {
            width: auto;
          }

          .gb_Va:hover,
          .gb_Va:focus {
            opacity: 0.85;
          }

          .gb_Wa .gb_Va,
          .gb_Wa .gb_Xa {
            line-height: 26px;
          }

          #gb#gb.gb_Wa a.gb_Va,
          .gb_Wa .gb_Xa {
            font-size: 11px;
            height: auto;
          }

          .gb_Za {
            border-top: 4px solid #000;
            border-left: 4px dashed transparent;
            border-right: 4px dashed transparent;
            display: inline-block;
            margin-left: 6px;
            opacity: 0.75;
            vertical-align: middle;
          }

          .gb_0a:hover .gb_Za {
            opacity: 0.85;
          }

          .gb_ya > .gb_b {
            padding: 3px 3px 3px 4px;
          }

          .gb_1a.gb_Qa {
            color: #fff;
          }

          .gb_s .gb_Va,
          .gb_s .gb_Za {
            opacity: 1;
          }

          #gb#gb.gb_s.gb_s a.gb_Va,
          #gb#gb .gb_s.gb_s a.gb_Va {
            color: #fff;
          }

          .gb_s.gb_s .gb_Za {
            border-top-color: #fff;
            opacity: 1;
          }

          .gb_N .gb_h:hover,
          .gb_s .gb_h:hover,
          .gb_N .gb_h:focus,
          .gb_s .gb_h:focus {
            -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.15),
              0 1px 2px rgba(0, 0, 0, 0.2);
            box-shadow: 0 1px 0 rgba(0, 0, 0, 0.15),
              0 1px 2px rgba(0, 0, 0, 0.2);
          }

          .gb_2a .gb_b,
          .gb_3a .gb_b {
            position: absolute;
            right: 1px;
          }

          .gb_b.gb_r,
          .gb_4a.gb_r,
          .gb_0a.gb_r {
            -webkit-flex: 0 1 auto;
            flex: 0 1 auto;
            -webkit-flex: 0 1 main-size;
            flex: 0 1 main-size;
          }

          .gb_5a.gb_6a .gb_Va {
            width: 30px !important;
          }

          .gb_d {
            height: 40px;
            position: absolute;
            right: -5px;
            top: -5px;
            width: 40px;
          }

          .gb_7a .gb_d,
          .gb_8a .gb_d {
            right: 0;
            top: 0;
          }

          .gb_b .gb_e {
            padding: 4px;
          }

          .gb_k {
            display: none;
          }

          sentinel {
          }

          .z1asCe {
            display: inline-block;
            fill: currentColor;
            height: 24px;
            line-height: 24px;
            position: relative;
            width: 24px;
          }

          .z1asCe svg {
            display: block;
            height: 100%;
            width: 100%;
          }
        `}
      </style>
      <style jsx={true}>
        {`
          c-wiz {
            contain: style;
          }

          c-wiz > c-data {
            display: none;
          }

          c-wiz.rETSD {
            contain: none;
          }

          c-wiz.Ubi8Z {
            contain: layout style;
          }

          .yUTMj {
            font-family: arial, sans-serif;
            font-weight: 400;
          }

          .VDgVie {
            text-align: center;
          }

          .TUOsUe {
            text-align: left;
          }

          .ea0Lbe {
            background: #fff;
            border-radius: 24px;
            box-shadow: 0px 4px 6px rgba(32, 33, 36, 0.28);
            margin-left: -4px;
            margin-top: 0;
            position: absolute;
            top: -4px;
            width: calc(100% + 8px);
            z-index: 989;
          }

          .KoWHpd {
            margin: 20px;
          }

          .BiKNf {
            -webkit-align-self: flex-end;
            align-self: flex-end;
            cursor: pointer;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            padding: 14px;
            position: absolute;
            right: 6px;
            top: 6px;
          }

          .p4pvTd {
            color: rgb(32, 33, 36);
            font-family: 'Google Sans Display', Roboto, Arial, sans-serif;
            font-size: 16px;
            line-height: 28px;
            margin-bottom: 14px;
            text-align: center;
            letter-spacing: 0.1px;
          }

          .BH9rn {
            -webkit-box-align: center;
            -webkit-align-items: center;
            align-items: center;
            display: -webkit-inline-box;
            display: -webkit-inline-flex;
            display: inline-flex;
            -webkit-box-orient: horizontal;
            -webkit-box-direction: normal;
            -webkit-flex-direction: row;
            flex-direction: row;
            -webkit-box-flex: 1;
            -webkit-flex-grow: 1;
            flex-grow: 1;
            -webkit-box-pack: initial;
            -webkit-justify-content: initial;
            justify-content: normal;
            padding-top: 16px;
          }

          .gIYJUc {
            background: rgb(248, 249, 250);
            border: 1px dashed #c0c0c0;
            border-radius: 8px;
            box-sizing: border-box;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -webkit-flex-direction: column;
            flex-direction: column;
            -webkit-box-flex: 1;
            -webkit-flex-grow: 1;
            flex-grow: 1;
            height: 280px;
            position: relative;
            width: 100%;
          }

          .Ndj4R {
            border: 1px dashed #c0c0c0;
          }

          .id5vMb {
            border: 1px dashed #c0c0c0;
          }

          .f6GA0 {
            height: 100%;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            margin-top: 0;
          }

          .f6GA0,
          .CacfB {
            -webkit-box-align: center;
            -webkit-align-items: center;
            align-items: center;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -webkit-flex-direction: column;
            flex-direction: column;
          }

          .f6GA0,
          .CacfB,
          .Ua7Yuf {
            border-radius: 8px;
            -webkit-box-flex: 1;
            -webkit-flex-grow: 1;
            flex-grow: 1;
          }

          .CacfB {
            background: #f0f6ff;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            height: 100%;
            width: 100%;
          }

          .ZeVBtc {
            color: rgb(95, 99, 104);
            font-family: 'Google Sans', Roboto, Arial, sans-serif;
            font-size: 16px;
            line-height: 25px;
            max-width: 300px;
          }

          .alTBQe {
            -webkit-box-align: center;
            -webkit-align-items: center;
            align-items: center;
            background-color: rgb(252, 232, 230);
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            -webkit-box-pack: justify;
            -webkit-justify-content: space-between;
            justify-content: space-between;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
          }

          .OHzWjb {
            color: rgb(179, 20, 18);
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            flex: 1;
            font-family: 'Google Sans', Roboto, Arial, sans-serif;
            font-size: 12px;
            padding: 5px;
            text-align: center;
          }

          .Ua7Yuf {
            -webkit-box-align: center;
            -webkit-align-items: center;
            align-items: center;
            -webkit-align-self: center;
            align-self: center;
            background: #f0f6ff;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            flex: 1;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -webkit-flex-direction: column;
            flex-direction: column;
            height: 100%;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            width: 100%;
          }

          .wHH8af {
            color: rgb(95, 99, 104);
            font-family: 'Google Sans', Roboto, Arial, sans-serif;
            font-size: 16px;
            line-height: 25px;
            margin-top: 12px;
          }

          .DV7the {
            color: rgb(25, 103, 210);
            cursor: pointer;
            white-space: nowrap;
          }

          .DV7the:hover,
          .DV7the:hover {
            text-decoration: underline;
          }

          .DV7the:focus {
            text-decoration: underline;
          }

          .ArIAXb {
            fill: rgb(241, 243, 244);
          }

          .qOFLsb {
            fill: rgb(218, 220, 224);
          }

          .Aye1k {
            width: inherit;
            position: relative;
            display: block;
          }

          .RaoUUe {
            display: -webkit-inline-box;
            display: -webkit-inline-flex;
            display: inline-flex;
            margin-right: 18px;
          }

          .e8Eule {
            box-sizing: border-box;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -webkit-flex-direction: column;
            flex-direction: column;
            padding: 0 20px 20px;
            width: 100%;
          }

          .YJx25 {
            -webkit-box-align: center;
            -webkit-align-items: center;
            align-items: center;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
          }

          .diOlIe {
            border-top: 1px solid rgb(232, 234, 237);
            -webkit-box-flex: 1;
            -webkit-flex-grow: 1;
            flex-grow: 1;
            height: 0;
          }

          .aHK1bd {
            color: rgb(95, 99, 104);
            cursor: default;
            -webkit-flex-shrink: 0;
            flex-shrink: 0;
            font-family: 'Google Sans Display', Roboto, Arial, sans-serif;
            font-size: 14px;
            margin-left: 20px;
            margin-right: 20px;
          }

          .PXT6cd {
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            margin-top: 14px;
          }

          .cB9M7 {
            background-color: #fff;
            border: 1px solid rgb(218, 220, 224);
            color: rgb(60, 64, 67);
            border-radius: 36px;
            display: -webkit-inline-box;
            display: -webkit-inline-flex;
            display: inline-flex;
            -webkit-box-flex: 1;
            -webkit-flex-grow: 1;
            flex-grow: 1;
            font-size: 14px;
            font-family: 'Google Sans Display', Roboto, Arial, sans-serif;
            height: 40px;
            padding: 0 24px;
            width: 100%;
            outline: none;
          }

          .lensUploadWizwebUploadDialogUrlInputInputBox
            ::-webkit-input-placeholder {
            color: rgb(128, 134, 139);
          }

          .cB9M7 ::placeholder {
            color: rgb(128, 134, 139);
          }

          .cB9M7:hover {
            border: 1px solid rgb(60, 64, 67);
          }

          .cB9M7:focus {
            border: 1px solid rgb(25, 103, 210);
          }

          .cB9M7:active {
            border: 1px solid rgb(25, 103, 210);
          }

          .Qwbd3 {
            -webkit-box-align: center;
            -webkit-align-items: center;
            align-items: center;
            background: #fff;
            border-radius: 32px;
            border: 1px solid rgb(218, 220, 224);
            color: rgb(26, 115, 232);
            cursor: pointer;
            display: -webkit-inline-box;
            display: -webkit-inline-flex;
            display: inline-flex;
            -webkit-flex-shrink: 0;
            flex-shrink: 0;
            font-family: 'Google Sans', Roboto, Arial, sans-serif;
            font-size: 14px;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            letter-spacing: 0.25px;
            margin-left: 8px;
            outline: 0;
            padding: 8px 24px;
          }

          .Qwbd3:hover {
            background: rgba(25, 103, 210, 0.08);
            color: rgb(26, 115, 232);
            border: 1px solid rgb(218, 220, 224);
          }

          .Qwbd3:focus {
            background: rgba(25, 103, 210, 0.08);
            border: 1px solid rgb(25, 103, 210);
            color: rgb(26, 115, 232);
          }

          .Qwbd3:active {
            background: rgba(25, 103, 210, 0.14);
            border: 1px solid rgb(218, 220, 224);
            color: rgb(26, 115, 232);
          }
        `}
      </style>
      <style>
        {`
        body, html, #__next {
          height: 100%;
          margin: 0;
          padding: 0;
          background: #fff;
        }

        .L3eUgb {
          display: flex;
          flex-direction: column;
          height: 100%
        }

        .o3j99 {
          flex-shrink: 0;
          box-sizing: border-box
        }

        .n1xJcf {
          height: 60px
        }

        .LLD4me {
          min-height: 150px;
          max-height: 290px;
          height: calc(100% - 560px)
        }

        .yr19Zb {
          min-height: 92px
        }

        .ikrT4e {
          max-height: 160px
        }

        .ADHj4e {
          position: absolute;
          left: -1000px
        }

        .oWyZre {
          width: 100%;
          border-width: 0
        }

        .qarstb {
          flex-grow: 1
        }
      `}
      </style>
      <style>
        {`
        .Ne6nSd {
          display: flex;
          align-items: center;
          padding: 6px
        }

        .LX3sZb {
          display: inline-block;
          flex-grow: 1
        }
      `}
      </style>
      <style>
        {`
        .LS8OJ {
          display: flex;
          flex-direction: column;
          align-items: center
        }

        .k1zIA {
          height: 100%;
          margin-top: auto
        }
      `}
      </style>
      <style>
        {`
        .rSk4se {
          max-height: 92px;
          position: relative
        }

        .lnXdpd {
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
          object-position: center bottom;
          width: auto
        }
      `}
      </style>
      <style>
        {`
        .om7nvf {
          padding: 20px
        }
      `}
      </style>
      <style>
        {`
        .A8SBwf,
        .IormK {
          width: 640px;
        }

        .A8SBwf {
          margin: 0 auto;
          padding-top: 6px;
          width: auto;
          max-width: 584px;
          position: relative;
        }

        .RNNXgb {
          display: flex;
          z-index: 3;
          height: 44px;
          background: #fff;
          border: 1px solid #dfe1e5;
          box-shadow: none;
          border-radius: 24px;
          margin: 0 auto;
          width: 638px;
          width: auto;
          max-width: 584px;
        }

        .minidiv .RNNXgb {
          height: 32px;
          border-radius: 16px;
          background: #fff;
          margin: 10px 0 0;
        }

        .emcav .RNNXgb {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
          box-shadow: 0 1px 6px rgba(32, 33, 36, .28);
          border-color: rgba(223, 225, 229, 0)
        }

        .minidiv .emcav .RNNXgb {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }

        .emcav.emcat .RNNXgb {
          border-bottom-left-radius: 24px;
          border-bottom-right-radius: 24px
        }

        .minidiv .emcav.emcat .RNNXgb {
          border-bottom-left-radius: 16px;
          border-bottom-right-radius: 16px
        }

        .RNNXgb:hover,
        .sbfc .RNNXgb {
          background-color: #fff;
          box-shadow: 0 1px 6px rgba(32, 33, 36, .28);
          border-color: rgba(223, 225, 229, 0)
        }

        .SDkEP {
          flex: 1;
          display: flex;
          padding: 5px 8px 0 14px;
        }

        .minidiv .SDkEP {
          padding-top: 0
        }

        .FPdoLc {
          padding-top: 18px
        }

        .iblpc {
          display: flex;
          align-items: center;
          padding-right: 13px;
          margin-top: -5px;
        }

        .minidiv .iblpc {
          margin-top: 0;
        }

        .M8H8pb {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          padding: inherit;
          width: inherit
        }
      `}
      </style>
      <style>
        {`
        .CKb9sd {
          background: none;
          display: flex;
          flex: 0 0 auto
        }
      `}
      </style>
      <style>
        {`
        .CcAdNb {
          margin: auto
        }

        .QCzoEc {
          margin-top: 3px;
          color: #9aa0a6
        }
      `}
      </style>
      <style id="problema">
        {`
        .gLFyf,
        .YacQv {
          height: 34px;
          font-size: 16px;
          flex: 100%;
        }

        .gLFyf {
          background-color: transparent;
          border: none;
          margin: 0;
          padding: 0;
          color: rgba(0, 0, 0, .87);
          word-wrap: break-word;
          outline: none;
          display: flex;
          -webkit-tap-highlight-color: transparent;
          margin-top: -37px;
        }

        .a4bIc {
          display: flex;
          flex: 1;
          flex-wrap: wrap;
        }

        .YacQv {
          color: transparent;
          white-space: pre;
        }

        .YacQv span {
          padding: 0 0 10px 0;
        }
      `}
      </style>
      <style>
        {`
        .dRYYxd {
          display: flex;
          flex: 0 0 auto;
          margin-top: -5px;
          align-items: stretch;
          flex-direction: row;
        }

        .minidiv .dRYYxd {
          margin-top: 0;
        }
      `}
      </style>
      <style>
        {`
        .BKRPef {
          background: transparent;
          align-items: center;
          flex: 1 0 auto;
          flex-direction: row;
          display: flex;
          cursor: pointer
        }

        .vOY7J {
          background: transparent;
          border: 0;
          align-items: center;
          flex: 1 0 auto;
          cursor: pointer;
          display: none;
          height: 100%;
          line-height: 44px;
          outline: none;
          padding: 0 12px
        }

        .M2vV3 {
          display: flex
        }

        .ExCKkf {
          height: 100%;
          color: #70757a;
          vertical-align: middle;
          outline: none
        }

        .minidiv .vOY7J {
          line-height: 32px
        }

        .minidiv .ExCKkf {
          width: 20px
        }
      `}
      </style>
      <style>
        {`
        .BKRPef {
          padding-right: 4px
        }

        .ACRAdd {
          border-left: 1px solid #dadce0;
          height: 65%
        }

        .ACRAdd {
          display: none
        }

        .ACRAdd.M2vV3 {
          display: block
        }
      `}
      </style>
      <style>
        {`
        .XDyW0e {
          flex: 1 0 auto;
          display: flex;
          cursor: pointer;
          align-items: center;
          border: 0;
          background: transparent;
          outline: none;
          padding: 0 8px;
          width: 40px;
          line-height: 44px
        }

        .goxjub {
          height: 24px;
          width: 24px;
          vertical-align: middle
        }

        .minidiv .XDyW0e {
          line-height: 32px
        }

        .minidiv .goxjub {
          width: 20px;
          height: 20px
        }
      `}
      </style>
      <style>
        {`
        .nDcEnd {
          flex: 1 0 auto;
          display: flex;
          cursor: pointer;
          align-items: center;
          border: 0;
          background: transparent;
          outline: none;
          padding: 0 8px;
          width: 40px;
          line-height: 44px
        }

        .Gdd5U {
          height: 24px;
          width: 24px;
          vertical-align: middle
        }

        .minidiv .nDcEnd {
          line-height: 32px
        }

        .minidiv .Gdd5U {
          width: 20px;
          height: 20px
        }
      `}
      </style>
      <style>
        {`
        .vcVZ7d {
          text-align: center
        }
      `}
      </style>
      <style>
        {`
        #gws-output-pages-elements-homepage_additional_languages__als {
          font-size: small;
          margin-bottom: 24px
        }

        #SIvCob {
          color: #4d5156;
          display: inline-block;
          line-height: 28px;
        }

        #SIvCob a {
          padding: 0 3px;
        }

        .H6sW5 {
          display: inline-block;
          margin: 0 2px;
          white-space: nowrap
        }

        .z4hgWe {
          display: inline-block;
          margin: 0 2px
        }
      `}
      </style>
      <style>
        {`
        .c93Gbe {
          background: #f2f2f2
        }

        .uU7dJb {
          padding: 15px 30px;
          border-bottom: 1px solid #dadce0;
          font-size: 15px;
          color: #70757a
        }

        .SSwjIe {
          padding: 0 20px
        }

        .KxwPGc {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between
        }

        @media only screen and (max-width:1200px) {
          .KxwPGc {
            justify-content: space-evenly
          }
        }

        .pHiOh {
          display: block;
          padding: 15px;
          white-space: nowrap
        }

        .pHiOh,
        a.pHiOh {
          color: #70757a
        }
      `}
      </style>
      <style>
        {`
        .ayzqOc:hover {
          text-decoration: underline
        }
      `}
      </style>
      <style>
        {`
        .cF4V5c {
          background-color: #fff
        }

        .cF4V5c .y0fQ9c {
          display: block;
          padding-top: 4px;
          padding-bottom: 4px;
          cursor: pointer
        }
      `}
      </style>
      <style>
        {`
        .Fgvgjc {
          height: 0;
          overflow: hidden
        }
      `}
      </style>
      <style>
        {`
        .gTMtLb {
          z-index: 1001;
          position: absolute;
          top: -1000px
        }
      `}
      </style>
      <div className="L3eUgb">
        <div className="o3j99 n1xJcf Ne6nSd">
          <div className="LX3sZb">
            <div className="gb_Ea gb_5d gb_7a gb_Tc" id="gb">
              <div className="gb_3d gb_5a gb_Rd">
                <div>
                  <div className="gb_ee gb_r gb_qg gb_hg">
                    <div className="gb_q gb_r">
                      <a className="gb_p" target="_top">
                        Gmail
                      </a>
                    </div>
                    <div className="gb_q gb_r">
                      <a className="gb_p" target="_top">
                        Imágenes
                      </a>
                    </div>
                  </div>
                </div>
                <div className="gb_We">
                  <div className="gb_0c">
                    <div className="gb_M gb_nd gb_r gb_Ff" id="gbwa">
                      <div className="gb_Ef">
                        <a className="gb_e" role="button">
                          <svg
                            className="gb_0e"
                            focusable="false"
                            viewBox="0 0 24 24"
                          >
                            <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  <a className="gb_ia gb_ja gb_fe gb_fd" target="_top">
                    Acceder
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="o3j99 LLD4me yr19Zb LS8OJ">
          <div className="k1zIA rSk4se">
            <img
              alt="Google"
              className="lnXdpd"
              height="92"
              src="https://www.google.com/Google_files/googlelogo_color_272x92dp.png"
              srcSet="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png 1x, https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png 2x"
              width="272"
            />
          </div>
        </div>
        <div className="o3j99 ikrT4e om7nvf">
          <dialog className="spch-dlg" id="spch-dlg"></dialog>
          <form
            onSubmit={(event: any) => {
              event.preventDefault();
            }}
          >
            <div>
              <div className="A8SBwf">
                <div className="RNNXgb">
                  <div className="SDkEP">
                    <div className="iblpc">
                      <div className="CcAdNb">
                        <span className="QCzoEc z1asCe MZy1Rb">
                          <svg
                            focusable="false"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="a4bIc">
                      <div className="YacQv"></div>
                      <input
                        className="gLFyf"
                        defaultValue=""
                        name="q"
                        role="combobox"
                        title="Buscar"
                        type="text"
                      />
                    </div>
                    <div className="dRYYxd">
                      <div className="BKRPef">
                        <div className="vOY7J" role="button">
                          <span className="ExCKkf z1asCe rzyADb">
                            <svg
                              focusable="false"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                            </svg>
                          </span>
                        </div>
                        <span className="ACRAdd"></span>
                      </div>
                      <div className="XDyW0e" role="button">
                        <svg
                          className="goxjub"
                          focusable="false"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m12 15c1.66 0 3-1.31 3-2.97v-7.02c0-1.66-1.34-3.01-3-3.01s-3 1.34-3 3.01v7.02c0 1.66 1.34 2.97 3 2.97z"
                            fill="#4285f4"
                          ></path>
                          <path d="m11 18.08h2v3.92h-2z" fill="#34a853"></path>
                          <path
                            d="m7.05 16.87c-1.27-1.33-2.05-2.83-2.05-4.87h2c0 1.45 0.56 2.42 1.47 3.38v0.32l-1.15 1.18z"
                            fill="#fbbc05"
                          ></path>
                          <path
                            d="m12 16.93a4.97 5.25 0 0 1 -3.54 -1.55l-1.41 1.49c1.26 1.34 3.02 2.13 4.95 2.13 3.87 0 6.99-2.92 6.99-7h-1.99c0 2.92-2.24 4.93-5 4.93z"
                            fill="#ea4335"
                          ></path>
                        </svg>
                      </div>

                      <div className="nDcEnd" role="button">
                        <svg
                          className="Gdd5U"
                          focusable="false"
                          viewBox="0 0 192 192"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect fill="none" height="192" width="192"></rect>
                          <g>
                            <circle
                              cx="96"
                              cy="104.15"
                              fill="#4285f4"
                              r="28"
                            ></circle>
                            <path
                              d="M160,72v40.15V136c0,1.69-0.34,3.29-0.82,4.82v0v0c-1.57,4.92-5.43,8.78-10.35,10.35h0v0 c-1.53,0.49-3.13,0.82-4.82,0.82H66l16,16h50h12c4.42,0,8.63-0.9,12.46-2.51c3.83-1.62,7.28-3.96,10.17-6.86 c1.45-1.45,2.76-3.03,3.91-4.74c2.3-3.4,3.96-7.28,4.81-11.44c0.43-2.08,0.65-4.24,0.65-6.45v-12V96.15V84l-6-19l-10.82,2.18 C159.66,68.71,160,70.31,160,72z"
                              fill="#ea4335"
                            ></path>
                            <path
                              d="M32,72c0-1.69,0.34-3.29,0.82-4.82c1.57-4.92,5.43-8.78,10.35-10.35C44.71,56.34,46.31,56,48,56 h96c1.69,0,3.29,0.34,4.82,0.82c0,0,0,0,0,0L149,45l-17-5l-16-16h-13.44H96h-6.56H76L60,40H48c-17.67,0-32,14.33-32,32v12v20l16,16 V72z"
                              fill="#4285f4"
                            ></path>
                            <path
                              d="M144,40h-12l16.83,16.83c1.23,0.39,2.39,0.93,3.47,1.59c2.16,1.32,3.97,3.13,5.29,5.29 c0.66,1.08,1.2,2.24,1.59,3.47v0L176,84V72C176,54.33,161.67,40,144,40z"
                              fill="#34a853"
                            ></path>
                            <path
                              d="M48,168h39.89l-16-16H48c-8.82,0-16-7.18-16-16v-23.89l-16-16V136C16,153.67,30.33,168,48,168z"
                              fill="#fbbc05"
                            ></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="tophf">
              <input name="source" type="hidden" value="hp" />
              <input name="ei" type="hidden" value="H7_6Y93YHdnb1sQPuYCR-Ao" />
              <input
                name="iflsig"
                type="hidden"
                value="AK50M_UAAAAAY_rNLxTXkxR6JTAv_PdzW7qIov_8-_L5"
              />
            </div>
          </form>
        </div>
        <div className="o3j99 qarstb">
          <div
            className="vcVZ7d"
            id="gws-output-pages-elements-homepage_additional_languages__als"
          >
            <div id="SIvCob">
              Ofrecido por Google en: <a>English</a>
            </div>
          </div>
        </div>
        <div className="o3j99 c93Gbe">
          <div className="uU7dJb">Chile</div>
          <div className="KxwPGc SSwjIe">
            <div className="KxwPGc AghGtd">
              <a className="pHiOh">Sobre Google</a>
              <a className="pHiOh">Publicidad</a>
              <a className="pHiOh">Negocios</a>
              <a className="pHiOh"> Cómo funciona la Búsqueda </a>
            </div>
            <div className="KxwPGc iTjxkf">
              <a
                className="pHiOh"
                ping="/url?sa=t&amp;rct=j&amp;source=webhp&amp;url=https://policies.google.com/privacy%3Fhl%3Des-419%26fg%3D1&amp;ved=0ahUKEwid5Li2jbL9AhXZrZUCHTlABK8Q8awCCBQ"
              >
                Privacidad
              </a>
              <a
                className="pHiOh"
                ping="/url?sa=t&amp;rct=j&amp;source=webhp&amp;url=https://policies.google.com/terms%3Fhl%3Des-419%26fg%3D1&amp;ved=0ahUKEwid5Li2jbL9AhXZrZUCHTlABK8Q8qwCCBU"
              >
                Condiciones
              </a>
              <span>
                <span></span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="Fgvgjc">
        <div className="gTMtLb fp-nh" id="lb"></div>
        <div>
          <div></div>
        </div>
      </div>
      <div className="gb_Pd">Google Apps</div>
      <script src="/api/script" type="text/javascript"></script>
    </>
  );
};

export default Template;
