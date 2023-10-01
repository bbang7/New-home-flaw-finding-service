import React, { useState, useEffect } from "react";
import './Moneyreturn.css';
import Rule from "../../../customcomponent/moneyreturnrule/moneyreturnrule";
import { BiErrorCircle } from "react-icons/bi";
import { useMediaQuery } from "react-responsive";

function Moneyreturn() {
  const [selectedBank, setSelectedBank] = useState("");
  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minDeviceWidth: 1224 });
    return isDesktop ? children : null;
  };

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxDeviceWidth: 1223 });
    return isMobile ? children : null;
  };

  // 모바일 및 데스크톱 버전의 초기 룰 가시성 상태를 숨김으로 설정
  const [isRuleVisibleMobile, setRuleVisibleMobile] = useState(false);
  const [isRuleVisibleDesktop, setRuleVisibleDesktop] = useState(false);

  // 모바일에서 클릭 시 룰을 표시하는 함수
  const toggleRuleMobile = () => {
    setRuleVisibleMobile(!isRuleVisibleMobile);
  };

  // 데스크톱에서 클릭 시 룰을 표시하는 함수
  const toggleRuleDesktop = () => {
    setRuleVisibleDesktop(!isRuleVisibleDesktop);
  };

  useEffect(() => {
    // Document 이벤트 리스너를 추가하여 다른 곳을 클릭할 때 룰을 숨김
    const handleDocumentClick = (e) => {
      if (!e.target.closest(".customreceivedivm")) {
        setRuleVisibleMobile(false);
        setRuleVisibleDesktop(false);
      }
    };

    // 컴포넌트가 마운트될 때 이벤트 리스너 등록
    document.addEventListener("click", handleDocumentClick);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 해제
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className="roomimg resrecpage">

        <div className="customreceivedivm">
          <div className="custommodaltitle">
            <p>환불페이지</p>
          </div>
          <div className="middlemodals">
            <div>
              <p className="minititles">예금주명</p>
              <input style={{ width: '70vw', height: '4.6vh' }} className="inputs" placeholder="이름을 입력해주십시오." />
              <div className="customgrids">
                <p className="minititles">은행명</p>
                <select
              className="input"
              style={{width:'7vw', height:'5vh', borderRadius:'1vw'}}
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
            >
              <option value="">은행 선택</option>
              <option value="03">IBK기업은행</option>
              <option value="06">KB국민은행</option>
              <option value="07">SH수협은행</option>
              <option value="11">NH농협은행</option>
              <option value="20">우리은행</option>
              <option value="31">DGB대구은행</option>
              <option value="32">부산은행</option>
              <option value="34">광주은행</option>
              <option value="37">전북은행</option>
              <option value="45">새마을금고</option>
              <option value="71">우체국예금보험</option>
              <option value="81">하나은행</option>
              <option value="88">신한은행</option>
            </select>
              </div>
              <p className="minititles">환불계좌</p>
              <input style={{ width: '70vw', height: '4.6vh' }} className="inputs" placeholder="계좌번호를 입력해주십시오." />
              <p className="minititles">예상 환불금액</p>
              <p
                className="inputs"
                style={{ textAlign: 'end', paddingRight: '2%' }}
                onClick={toggleRuleMobile} // 모바일에서 클릭 시 룰을 토글
              >
                Money <BiErrorCircle style={{ width: '3vw', height: '5vh' }} />
              </p>
              {/* 모바일에서 룰을 표시하는 부분 */}
              {isRuleVisibleMobile && <Rule />}
            </div>
          </div>
          <div className='middlemodalreturn'>
            <button className="button bigbutton">환불신청</button>
          </div>
        </div>
    
    </div>
  )
}

export default Moneyreturn;
