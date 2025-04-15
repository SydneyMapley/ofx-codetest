import { useEffect, useState } from "react";
import DropDown from "../../Components/ui/DropDown";
import ProgressBar from "../../Components/ui/ProgressBar";
import Loader from "../../Components/icons/Loader";
import { useAnimationFrame } from "../../Hooks/useAnimationFrame";
import classes from "./Rates.module.css";
import CountryData from "../../Libs/Countries.json";
import countryToCurrency from "../../Libs/CountryCurrency.json";
import Input from "../../Components/ui/Input";
import TransferIcon from "../../Components/icons/Transfer";
import TooltipDemo from "../../Components/ui/ToolTip";
import { toast } from "sonner";

let countries = CountryData.CountryCodes;

const Rates = () => {
  const [fromCurrency, setFromCurrency] = useState<string>("AU");
  const [toCurrency, setToCurrency] = useState<string>("US");

  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [progression, setProgression] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState<number>(1);
  const [calculatedValue, setCalculatedValue] = useState<{
    markupValue: number;
    trueValue: number;
  }>({
    markupValue: 0,
    trueValue: 0,
  });

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const ofxRateCalculation = () => {
    const adjustedRate = exchangeRate - 0.005 * exchangeRate;
    const trueValue = Math.round(inputValue * exchangeRate * 100) / 100;
    const markupValue = Math.round(inputValue * adjustedRate * 100) / 100;

    setCalculatedValue({
      markupValue,
      trueValue,
    });
  };

  const Flag = ({ code }: { code: string }) => (
    <img alt={code || ""} src={`/img/flags/${code || ""}.svg`} width="20px" className={classes.flag} />
  );

  const fetchData = async () => {
    if (!loading) {
      setLoading(true);

      const options = {
        method: "GET",
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
        },
      };
      await fetch(
        // typically I would put this in a .env file but for the sake of simplicity I'm leaving it inline.
        "https://rates.staging.api.paytron.com/rate/public?" +
          new URLSearchParams({
            sellCurrency: countryToCurrency[fromCurrency as keyof typeof countryToCurrency],
            buyCurrency: countryToCurrency[toCurrency as keyof typeof countryToCurrency],
          }),
        options
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.retailRate) {
            setLoading(false);
            setExchangeRate(res.retailRate);
          } else {
            toast.error(res.detail);
            setLoading(false);
            setFromCurrency("AU");
            setToCurrency("US");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    fetchData();
    setProgression(0);
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    ofxRateCalculation();
  }, [inputValue, exchangeRate]);

  // Demo progress bar moving :)
  useAnimationFrame(!loading, (deltaTime) => {
    setProgression((prevState) => {
      if (prevState > 0.998) {
        fetchData();
        return 0;
      }
      return (prevState + deltaTime * 0.0001) % 1;
    });
  });

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.heading}>Currency Conversion</div>

        <div className={classes.rowWrapper}>
          <div className={classes.columnWrapper}>
            <DropDown
              leftIcon={<Flag code={fromCurrency} />}
              label={"From"}
              selected={countryToCurrency[fromCurrency as keyof typeof countryToCurrency]}
              options={countries.map(({ code }) => ({
                option: countryToCurrency[code as keyof typeof countryToCurrency],
                key: code,
                icon: <Flag code={code} />,
              }))}
              setSelected={(key: string) => {
                setFromCurrency(key);
              }}
              style={{}}
            />
            <Input type="number" min={1} value={inputValue} onChange={(e) => setInputValue(Number(e.target.value))} />
          </div>
          <div className={classes.exchangeWrapper}>
            <button onClick={() => swapCurrencies()} className={classes.transferIcon}>
              <TransferIcon style={{ height: "24px" }} fill="#142557" />
            </button>
            <div className={classes.rate}>{exchangeRate}</div>
          </div>
          <div className={classes.columnWrapper}>
            <DropDown
              leftIcon={<Flag code={toCurrency} />}
              label={"To"}
              selected={countryToCurrency[toCurrency as keyof typeof countryToCurrency]}
              options={countries.map(({ code }) => ({
                option: countryToCurrency[code as keyof typeof countryToCurrency],
                key: code,
                icon: <Flag code={code} />,
              }))}
              setSelected={(key: string) => {
                setToCurrency(key);
              }}
              style={{}}
            />
            <div className={classes.inputWrapper}>
              <div className={classes.tooltipWrapper}>
                <TooltipDemo
                  content={`The value displayed includes the OFX markup of 0.05%, the "true" value is ${calculatedValue.trueValue}`}
                />
              </div>
              <Input type="text" value={calculatedValue.markupValue} disabled />
            </div>
          </div>
        </div>
        <ProgressBar progress={progression} animationClass={loading ? classes.slow : ""} style={{ marginTop: "20px" }} />
        {loading && (
          <div className={classes.loaderWrapper}>
            <Loader width={"25px"} height={"25px"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Rates;
