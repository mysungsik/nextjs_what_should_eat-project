import styles from "./greeting.module.css";

function GreetingCom() {
  return (
    <div className={styles.maindiv}>
      <div>
        <h1>환영합니다</h1>
        <h3>
          안녕하세요. 이 페이지는 뭘 먹을지, 고민하는 여러분들을 위한 사이트
          입니다.
        </h3>
      </div>
      <div>
        <p>
          상단의 <span>[뭐먹지]</span> 를 누르시면,
          <span>[카테고리별, 태그별] </span> 정리된 음식을 보실 수 있습니다.
        </p>
        <p>
          또한, <span>[랜덤 선택기]</span>를 이용하시면 그 중 아무거나 랜덤으로
          하나 뽑아드립니다.
        </p>
      </div>
      <div>
        <p>
          <span>[로그인]</span>을 누르시면,
          <span>[회원가입 및 로그인이 가능합니다.]</span>
        </p>
        <p>
          그냥 아무거나 치시고 가입하시고, 로그인 후 이용 가능하신 메뉴들을
          이용하실 수 있습니다.
        </p>
      </div>
      <div>
        <p>
          <span>[로그인]</span>을 하시게 되면,<span>[내 음식]</span> 페이지를
          통해,<span>[찜한 상품]</span> 을 이용 가능하게됩니다.
        </p>
        <p>
          둘러보시다가, 어?내 주변에 저거 파는데, 라고 생각하시는 맛난 음식들을
          찜해두시면 됩니다.
        </p>
        <p>
          뭘 먹을지 고민이 되실때 <span>[개인 페이지에 있는 랜덤선택기]</span>를
          이용하시면, <span>찜한 음식들 중 하나로 랜덤</span>선택해드립니다.
        </p>
      </div>

      <div>
        <p>
          <span>[칼로리 계산기]</span> 를 이용하시면,
          <span>[하루 섭취한 칼로리를 계산]</span> 해 드립니다.
          <span>단위는 100g단위</span> , 칼로리 참조는 위키입니다.
        </p>
      </div>
      <div>
        <p>
          <span>[Contact]</span> 페이지에서는 제게 메일을 보내 실 수 있습니다.
          하핫 즐거운 이용 되세요
        </p>
      </div>
    </div>
  );
}
export default GreetingCom;
