/**
 * 허락, 확인 없이 데이터가 바뀌는 것을 방지하기 위한 인터페이스 설정
 */
interface LayoutMetadata {
  default: {
    title: string;
    description: string;
    language: string;
  };
  style: {
    padding: string;
    header: {
      backgroundColor: string;
    };
    footer: {
      backgroundColor: string;
    };
  };
  text: {
    anchor : string;
    paragraph : string;
  }
}

/**
 * layoutMetadata 객체 생성 취지
 * 1. framework에서 제공하는 layout.tsx에 리터럴 값(실제 작성되는 값)이 언제 어떻게 변할지 예측하기 어렵기 때문에, 해당 파일과 같이 일원화 하면 관리하기 매우 편하다. (단, 어떻게 사용할 것인지에 대한 설계나 합의가 존재해야 한다)
 * 2. 아래의 값도 '언제든지 변할 수 있는' 값임을 인지하면 '충돌'이 발생하는 것을 방지할 수 있다.
 * 3. key와 value 등 객체의 '자료구조'는 작성자(팀장) 마음대로 작성하였으므로, 리액트가 아닌 자바스크립트(타입스크립트)이다.
 * 
 */

const layoutMetadata: LayoutMetadata = {
  default: {
    title: "Project B 인터랙션 점검",
    description: "Next.js로 확인",
    language: "ko",
  },
  style: {
    padding: "1rem",
    header: {
      backgroundColor: "lightblue",
    },
    footer: {
      backgroundColor: "ghostwhite",
    },
  },
  text: {
    anchor : "To Home",
    paragraph : "footer"
  }
};

export default layoutMetadata;