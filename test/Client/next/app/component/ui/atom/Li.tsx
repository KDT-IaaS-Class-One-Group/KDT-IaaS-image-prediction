interface DivProps {
  children: React.ReactNode;
  className?: string; // Add className prop
}

/**
 * 리스트 아이템 컴포넌트입니다.
 * @example
 * ```tsx
 * <Li>리스트 아이템</Li>
 * ```
 *
 *
 * @param {React.FC<DivProps>} props - 컴포넌트 속성
 * @param {React.ReactNode} props.children - 자식 요소
 * @param {string} props.className - 클래스 이름
 * @returns {React.ReactElement} 리스트 아이템 컴포넌트
 *
 *
 */
// Li 컴포넌트 정의
const Li: React.FC<DivProps> = ({ children, className = "" }) => {
  // 기본 스타일 초기화 및 사용자 정의 클래스 적용
  const liStyle = {
    margin: 0,
    padding: 0,
    listStyleType: "none", // 기본 리스트 스타일 제거
  };

  return (
    <li className={`listItem ${className}`} style={liStyle}>
      {children}
    </li>
  );
};
export default Li;
