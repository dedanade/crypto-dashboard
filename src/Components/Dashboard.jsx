import React, { useEffect, useState } from 'react';
import { ReactComponent as DASHBOARDSVG } from '../Images/Dashboard.svg';
import { ReactComponent as WALLETSVG } from '../Images/Wallet.svg';
import { ReactComponent as TRADESVG } from '../Images/Trades.svg';
import { ReactComponent as MESSAGESVG } from '../Images/Messages.svg';
import { ReactComponent as ACCOUNTSVG } from '../Images/Account.svg';
import { ReactComponent as MAGNIFIERSVG } from '../Images/Magnifier.svg';
import { ReactComponent as MENUSVG } from '../Images/Menu.svg';
import { ReactComponent as BELLSVG } from '../Images/Bell_Icn.svg';
import { ReactComponent as ARROWDOWNSVG } from '../Images/Down_Arrow.svg';

import { ReactComponent as BITCOINSVG } from '../Images/Bitcoincropped.svg';
import { ReactComponent as WALLETARROWDOWNSVG } from '../Images/WalletArrowdown.svg';
import { ReactComponent as WALLETARROWUPSVG } from '../Images/WalletArrowup.svg';
import { ReactComponent as GRAPHLINEDOWN } from '../Images/GraphLineDown.svg';
import { ReactComponent as GRAPHLINEUP } from '../Images/GraphLineup.svg';
import Chart from './Chart';

function Dashboard(props) {
  const wallets = [
    { name: 'BTC', amount: 1.975, rate: 12.5 },
    { name: 'ETH', amount: 23.234, rate: -5.23 },
    { name: 'BTC', amount: 330.234, rate: 39.69 },
  ];

  const [loading, setLoading] = useState(true);
  const [coinData, setCoinData] = useState({});
  const [filterIndex, setFilterIndex] = useState(3);

  const filterDetails = [
    { label: '6M', dayValue: 182 },
    { label: '3M', dayValue: 92 },
    { label: '1M', dayValue: 30 },
    { label: '7D', dayValue: 7 },
    { label: '24H', dayValue: 1 },
  ];

  useEffect(() => {
    processCoinData(7);
  }, []);

  const processCoinData = (numberOfDays, index) => {
    const dateNow = new Date();

    const oneMinuteAgo = dateNow.toISOString();

    dateNow.setDate(dateNow.getDate() - numberOfDays);

    const daysAgo = dateNow.toISOString();

    let granularity;

    if (numberOfDays <= 1) {
      granularity = 3600;
    } else if (numberOfDays === 7) {
      granularity = 21600;
    } else {
      granularity = 86400;
    }

    const options = { method: 'GET', headers: { Accept: 'application/json' } };

    Promise.all([
      fetch(
        `https://api.exchange.coinbase.com/products/btc-usd/candles?granularity=${granularity}&start=${encodeURI(
          daysAgo
        )}&end=${encodeURI(oneMinuteAgo)}`,
        options
      ),
      fetch(
        `https://api.exchange.coinbase.com/products/eth-usd/candles?granularity=${granularity}&start=${encodeURI(
          daysAgo
        )}&end=${encodeURI(oneMinuteAgo)}`,
        options
      ),
      fetch(
        `https://api.exchange.coinbase.com/products/ltc-usd/candles?granularity=${granularity}&start=${encodeURI(
          daysAgo
        )}&end=${encodeURI(oneMinuteAgo)}`,
        options
      ),
    ])
      .then(([btc, eth, ltc]) => {
        if (btc) {
          btc.json().then((response) => {
            const btcData = response
              .map((r) => {
                return r[4];
              })
              .reverse();
            setCoinData((prevData) => {
              return {
                ...prevData,
                btc: btcData,
              };
            });
          });
        }
        if (eth) {
          eth.json().then((response) => {
            const ethData = response
              .map((r) => {
                return r[4];
              })
              .reverse();
            setCoinData((prevData) => {
              return {
                ...prevData,
                eth: ethData,
              };
            });
          });
        }
        if (ltc) {
          ltc.json().then((response) => {
            const ltcData = response
              .map((r) => {
                return r[4];
              })
              .reverse();
            const timestamp = response
              .map((r) => {
                return new Date(r[0] * 1000).toISOString();
              })
              .reverse();
            setCoinData((prevData) => {
              return {
                ...prevData,
                ltc: ltcData,
                timestamp,
              };
            });
            setLoading(false);
          });
        }
      })
      .catch((e) => {
        alert('Unable to process data. Try again');
      });
    if (index >= 0) setFilterIndex(index);
  };

  if (loading) return <p>loading</p>;
  return (
    <section className='dashboard'>
      <div className='dashboard__flex container'>
        <aside className='dashboard__aside-nav'>
          <div className='dashboard__aside-nav__container'>
            <div className='nav'>
              <p src='#' alt='' className='nav__logo'>
                Logo
              </p>
              <ul className='nav__menu'>
                <a href='/dashboard' className='nav__menu_each active'>
                  <DASHBOARDSVG /> <span className='nav__p'> DashBoard </span>
                </a>
                <a href='/#' className='nav__menu_each'>
                  <WALLETSVG /> <span className='nav__p'> Wallet </span>
                </a>
                <a href='/#' className='nav__menu_each'>
                  <MESSAGESVG /> <span className='nav__p'> Messages </span>
                </a>
                <a href='/#' className='nav__menu_each'>
                  <TRADESVG /> <span className='nav__p'> Trade </span>
                </a>
                <a href='/#' className='nav__menu_each'>
                  <ACCOUNTSVG />
                  <span className='nav__p'>Account Settings </span>
                </a>
              </ul>
            </div>
          </div>
        </aside>
        <main className='dashboard__main'>
          <header className='dashboard__main__header'>
            <div className='header__text'>
              <h1>DashBoard</h1>
              <p className='header__text__sub-header'>
                With all of the styling tool options available in today’s market
              </p>
            </div>
            <div className='header__icons'>
              <div className='search-menu__set'>
                <MAGNIFIERSVG />
                <MENUSVG />
              </div>
              <div className='notification-profile__set'>
                <span className='notification__panel'>
                  <BELLSVG />
                  <span>25</span>
                </span>
                <div className='profile-view'>
                  <div className='profile__img'>
                    <img src='#' alt='' />
                  </div>
                  <p className='profile__name'>Adebonojo Daniel</p>
                  <ARROWDOWNSVG />
                </div>
              </div>
            </div>
          </header>
          <section className='wallets'>
            <p className='wallets__header'>Wallets</p>
            <div className='wallets-container'>
              {wallets.map((wallet, index) => {
                return (
                  <div key={index} className='mini-card wallet-card'>
                    <div className='mini-card__body wallet-card-body'>
                      <div className='wallet-details-container'>
                        <span className='wallet__logo'>
                          <BITCOINSVG />
                        </span>
                        <div className='wallet-details'>
                          <div className='wallet-details__amount_type'>
                            <span className='wallet___amount'>
                              {wallet.amount}
                            </span>
                            <span className='wallet___type-name'>
                              {wallet.name}
                            </span>
                          </div>
                          {Math.sign(wallet.rate) === 1 ? (
                            <div className='wallet-details__graph_arrow_rate'>
                              <span className='wallet___graph'>
                                <GRAPHLINEUP />
                              </span>
                              <span className='wallet___arrow'>
                                <WALLETARROWUPSVG />
                              </span>
                              <span className='wallet___rate positive'>
                                +{wallet.rate}%
                              </span>
                            </div>
                          ) : (
                            <div className='wallet-details__graph_arrow_rate'>
                              <span className='wallet___graph'>
                                <GRAPHLINEDOWN />
                              </span>
                              <span className='wallet___arrow'>
                                <WALLETARROWDOWNSVG />
                              </span>
                              <span className='wallet___rate negative'>
                                {wallet.rate}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className='mini-card wallet-card new-currency'>
                <div className='mini-card__body wallet-card-body'>
                  <p className='new-currency__text'>+ Add Currency</p>
                </div>
              </div>
            </div>
          </section>
          <section>
            <ul className='filter-chat'>
              {filterDetails.map((filter, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => processCoinData(filter.dayValue, index)}
                    className={
                      index === filterIndex
                        ? 'filter-chat__each active'
                        : 'filter-chat__each'
                    }
                  >
                    {filter.label}
                  </li>
                );
              })}
            </ul>
          </section>
          <Chart coinData={coinData} />
        </main>
      </div>
    </section>
  );
}

export default Dashboard;
