import base64

def decode_base64(base64_string: str) -> bytes:
    """
    Base64로 인코딩된 문자열을 디코딩하여 바이트로 반환하는 함수
    
    Parameters:
    - base64_string (str): Base64로 인코딩된 문자열

    Returns:
    - bytes: 디코딩된 바이트 데이터
    주의 : 
    - 디코딩된 바이트 데이터를 파일로 저장할 때는 'wb' 모드로 저장해야 함
    - 디코딩은 메서드하나로 가능하기 때문에 유틸이 필요 없기도 함
    
    """
    return base64.b64decode(base64_string)
