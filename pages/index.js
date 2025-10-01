import { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Calculator, Ruler, Maximize2, Home as HomeIcon, DollarSign, ChevronDown, ChevronUp, Share2 } from 'lucide-react';
import SEO from '../components/SEO';

// 단위 변환
const pyeongToSquareMeters = (pyeong) => pyeong * 3.3058;
const squareMetersToPyeong = (m2) => m2 / 3.3058;

// 비교 대상 데이터
const comparisonObjects = {
  singleBed: { 
    name: '싱글 침대', 
    width: 1.0, 
    length: 2.0, 
    height: 0.5, 
    color: '#D2691E',
  },
  queenBed: { 
    name: '퀸 침대', 
    width: 1.6, 
    length: 2.0, 
    height: 0.6, 
    color: '#8B4513',
  },
  sofa2: {
    name: '2인 소파',
    width: 1.5,
    length: 0.9,
    height: 0.8,
    color: '#696969',
  },
  desk: {
    name: '책상',
    width: 1.2,
    length: 0.6,
    height: 0.75,
    color: '#8B7355',
  },
  diningTable4: {
    name: '4인 식탁',
    width: 1.2,
    length: 0.8,
    height: 0.75,
    color: '#A0522D',
  },
  wardrobe: {
    name: '옷장',
    width: 1.0,
    length: 0.6,
    height: 2.0,
    color: '#4A4A4A',
  },
};

// 3D 객체 컴포넌트
function ComparisonObject({ obj, position }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, obj.height / 2, 0]}>
        <boxGeometry args={[obj.width, obj.height, obj.length]} />
        <meshStandardMaterial color={obj.color} />
      </mesh>
      
      <lineSegments position={[0, obj.height / 2, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(obj.width, obj.height, obj.length)]} />
        <lineBasicMaterial color="#000000" linewidth={2} />
      </lineSegments>
      
      <Text
        position={[0, obj.height + 0.3, 0]}
        fontSize={0.12}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#ffffff"
      >
        {obj.name}
      </Text>
      
      <Text
        position={[0, obj.height + 0.15, 0]}
        fontSize={0.08}
        color="#333333"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.005}
        outlineColor="#ffffff"
      >
        {obj.width}m × {obj.length}m
      </Text>
    </group>
  );
}

// 3D 공간 컴포넌트
function Room({ width, length, selectedObjects }) {
  // 격자 패턴 생성 (면적 내부에만)
  const gridLines = [];
  
  for (let i = 0; i <= Math.floor(length); i++) {
    if (i <= length) {
      gridLines.push(
        <line key={`h-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                0, 0, i,
                width, 0, i
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#d0d0d0" />
        </line>
      );
    }
  }
  
  for (let i = 0; i <= Math.floor(width); i++) {
    if (i <= width) {
      gridLines.push(
        <line key={`v-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                i, 0, 0,
                i, 0, length
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#d0d0d0" />
        </line>
      );
    }
  }
  
  const placedObjects = [];
  const padding = 0.3;
  let currentX = padding;
  let currentZ = padding;
  let rowHeight = 0;
  
  selectedObjects.forEach((key, index) => {
    const obj = comparisonObjects[key];
    
    if (currentX + obj.width > width - padding) {
      currentX = padding;
      currentZ += rowHeight + padding;
      rowHeight = 0;
    }
    
    if (currentZ + obj.length > length - padding) {
      return;
    }
    
    placedObjects.push(
      <ComparisonObject
        key={`${key}-${index}`}
        obj={obj}
        position={[currentX + obj.width / 2, 0, currentZ + obj.length / 2]}
      />
    );
    
    currentX += obj.width + padding;
    rowHeight = Math.max(rowHeight, obj.length);
  });
  
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[width/2, 0, length/2]} receiveShadow>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>

      <group position={[0, 0.001, 0]}>
        {gridLines}
      </group>

      <Text
        position={[width/2, 0, -0.4]}
        fontSize={0.2}
        color="#2563eb"
        anchorX="center"
        anchorY="middle"
        rotation={[-Math.PI / 2, 0, 0]}
        fontWeight="bold"
      >
        {width.toFixed(1)}m
      </Text>
      
      <Text
        position={[-0.4, 0, length/2]}
        fontSize={0.2}
        color="#2563eb"
        anchorX="center"
        anchorY="middle"
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        fontWeight="bold"
      >
        {length.toFixed(1)}m
      </Text>

      {placedObjects}

      <ambientLight intensity={0.8} />
      <directionalLight
        position={[10, 15, 10]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </>
  );
}

// 메인 컴포넌트
export default function Home() {
  // 빠른 계산기 상태
  const [quickCalcMode, setQuickCalcMode] = useState('pyeongToM2'); // 'pyeongToM2', 'm2ToPyeong', 'dimensionToPyeong'
  const [quickPyeong, setQuickPyeong] = useState('10');
  const [quickM2, setQuickM2] = useState('33.06');
  const [quickWidth, setQuickWidth] = useState('4');
  const [quickLength, setQuickLength] = useState('6');
  const [aspectRatioLock, setAspectRatioLock] = useState(false);
  
  // 평당 가격 계산기
  const [pricePerPyeong, setPricePerPyeong] = useState('1000');
  const [totalPyeong, setTotalPyeong] = useState('30');
  
  // 3D 시각화 상태
  const [visualWidth, setVisualWidth] = useState('4');
  const [visualLength, setVisualLength] = useState('6');
  const [selectedObjects, setSelectedObjects] = useState(['singleBed', 'desk']);
  
  // FAQ 토글
  const [openFaq, setOpenFaq] = useState(null);

  // 공유 함수
  const handleShare = async () => {
    const shareData = {
      title: '평수 계산기 - 레라픽',
      text: '평수와 제곱미터를 쉽게 변환하고 3D로 공간을 확인하세요!',
      url: 'https://www.lerapick.com'
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // 폴백: URL 복사
        await navigator.clipboard.writeText('https://www.lerapick.com');
        alert('링크가 클립보드에 복사되었습니다!');
      }
    } catch (err) {
      console.log('공유 실패:', err);
    }
  };

  // 빠른 계산기 핸들러
  const handleQuickPyeongChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setQuickPyeong(value);
      const pyeong = parseFloat(value) || 0;
      setQuickM2((pyeong * 3.3058).toFixed(2));
    }
  };

  const handleQuickM2Change = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setQuickM2(value);
      const m2 = parseFloat(value) || 0;
      setQuickPyeong((m2 / 3.3058).toFixed(2));
    }
  };

  const handleQuickWidthChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setQuickWidth(value);
      if (aspectRatioLock) {
        const w = parseFloat(value) || 0;
        const result = quickDimensionResult();
        const currentPyeong = parseFloat(result.pyeong) || 0;
        const targetM2 = currentPyeong * 3.3058;
        if (w > 0) {
          const newLength = targetM2 / w;
          setQuickLength(newLength.toFixed(2));
        }
      } else {
        // 평수 고정 모드가 아니면 평수 재계산
        setTimeout(updatePyeongFromDimension, 0);
      }
    }
  };

  const handleQuickLengthChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setQuickLength(value);
      if (aspectRatioLock) {
        const l = parseFloat(value) || 0;
        const result = quickDimensionResult();
        const currentPyeong = parseFloat(result.pyeong) || 0;
        const targetM2 = currentPyeong * 3.3058;
        if (l > 0) {
          const newWidth = targetM2 / l;
          setQuickWidth(newWidth.toFixed(2));
        }
      } else {
        // 평수 고정 모드가 아니면 평수 재계산
        setTimeout(updatePyeongFromDimension, 0);
      }
    }
  };

  const quickDimensionResult = () => {
    const w = parseFloat(quickWidth) || 0;
    const l = parseFloat(quickLength) || 0;
    const m2 = w * l;
    const pyeong = m2 / 3.3058;
    return { m2: m2.toFixed(2), pyeong: pyeong.toFixed(2) };
  };

  // 평수 고정 모드에서 치수 변경 시 평수 업데이트
  const updatePyeongFromDimension = () => {
    if (quickCalcMode === 'dimensionToPyeong' && !aspectRatioLock) {
      const result = quickDimensionResult();
      setQuickPyeong(result.pyeong);
      setQuickM2(result.m2);
    }
  };

  // 평당 가격 계산
  const calculateTotalPrice = () => {
    const price = parseFloat(pricePerPyeong) || 0;
    const pyeong = parseFloat(totalPyeong) || 0;
    return (price * pyeong).toLocaleString();
  };

  // 3D 시각화 핸들러
  const handleVisualWidthChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setVisualWidth(value);
    }
  };

  const handleVisualLengthChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setVisualLength(value);
    }
  };

  const toggleObject = (key) => {
    setSelectedObjects(prev => {
      if (prev.includes(key)) {
        return prev.filter(k => k !== key);
      } else {
        return [...prev, key];
      }
    });
  };

  const visualAreaInfo = () => {
    const w = parseFloat(visualWidth) || 0;
    const l = parseFloat(visualLength) || 0;
    const m2 = w * l;
    const pyeong = m2 / 3.3058;
    return { width: w, length: l, m2: m2.toFixed(2), pyeong: pyeong.toFixed(2) };
  };

  const apply3DFromQuick = () => {
    if (quickCalcMode === 'dimensionToPyeong') {
      setVisualWidth(quickWidth);
      setVisualLength(quickLength);
    } else {
      // 평수를 m2로 변환
      const pyeong = parseFloat(quickPyeong) || 10;
      const m2 = pyeong * 3.3058;
      
      // 정사각형으로 설정 (가장 정확한 방법)
      const side = Math.sqrt(m2);
      
      // 두 값을 정확히 같게 설정하여 오차 방지
      const sideStr = side.toFixed(3);
      setVisualWidth(sideStr);
      setVisualLength(sideStr);
    }
  };

  const faqs = [
    {
      q: "평수란 무엇인가요?",
      a: "평(坪)은 넓이를 나타내는 단위로, 한국과 일본에서 주로 사용됩니다. 1평은 약 3.3058제곱미터(m²)에 해당합니다. 부동산에서 아파트나 주택의 크기를 표현할 때 흔히 사용됩니다. 평은 원래 일본에서 사용하던 단위로, 한국에서는 일제강점기 때부터 사용되기 시작했습니다."
    },
    {
      q: "평수 계산 공식은 무엇인가요?",
      a: "평수 = 제곱미터(m²) ÷ 3.3058\n제곱미터 = 평수 × 3.3058\n또는 평수 = (가로 × 세로) ÷ 3.3058\n예: 가로 4m × 세로 6m = 24m² = 약 7.26평\n\n※ 3.3058이라는 숫자는 1평이 약 1.818m × 1.818m 크기이기 때문입니다."
    },
    {
      q: "분양 면적과 실사용 면적의 차이는?",
      a: "분양 면적(공급 면적)은 전용 면적에 공용 면적(복도, 계단, 엘리베이터 등)을 합친 면적입니다. 실사용 면적(전용 면적)은 실제로 사용 가능한 공간입니다. 일반적으로 분양 면적의 60~75%가 실사용 면적입니다.\n\n예시: 30평 아파트(분양 면적)\n- 실사용 면적: 약 18~22.5평\n- 공용 면적이 많을수록 실사용 면적 비율이 낮아집니다."
    },
    {
      q: "전용면적, 공급면적, 계약면적 차이는?",
      a: "• 전용면적: 실제로 사용할 수 있는 내부 공간 (방, 거실, 주방, 화장실)\n• 공급면적: 전용면적 + 주거공용면적 (계단, 복도, 벽체)\n• 계약면적: 공급면적 + 기타공용면적 (관리실, 경비실, 주차장 등)\n\n부동산에서 말하는 평수는 보통 공급면적을 기준으로 합니다."
    },
    {
      q: "몇 평이 적당한가요?",
      a: "1인 가구: 6~12평 (원룸, 투룸)\n2인 가구: 12~20평 (투룸, 작은 3룸)\n3~4인 가구: 20~30평 (3룸, 작은 4룸)\n4인 이상: 30평 이상 (4룸 이상)\n\n※ 생활 패턴, 재택근무 여부, 수납 공간 필요성에 따라 달라질 수 있습니다."
    },
    {
      q: "평당 가격은 어떻게 계산하나요?",
      a: "평당 가격 = 총 가격 ÷ 평수\n예: 3억원 아파트가 30평이라면\n평당 가격 = 300,000,000원 ÷ 30평 = 1,000만원/평\n\n평당 가격은 지역별 부동산 시세를 비교할 때 유용한 지표입니다."
    },
    {
      q: "평을 제곱미터로 빠르게 계산하는 방법은?",
      a: "간단한 암산법:\n평수 × 3.3 = 대략적인 제곱미터\n\n예시:\n• 10평 × 3.3 = 약 33m²\n• 20평 × 3.3 = 약 66m²\n• 30평 × 3.3 = 약 99m²\n\n정확한 계산은 3.3058을 곱해야 하지만, 3.3으로 계산해도 큰 차이가 없습니다."
    },
    {
      q: "제곱미터를 평으로 빠르게 계산하는 방법은?",
      a: "간단한 암산법:\n제곱미터 ÷ 3.3 = 대략적인 평수\n또는 제곱미터 × 0.3 = 대략적인 평수\n\n예시:\n• 33m² ÷ 3.3 = 약 10평\n• 33m² × 0.3 = 약 9.9평\n• 100m² × 0.3 = 약 30평"
    },
    {
      q: "베란다 면적도 평수에 포함되나요?",
      a: "베란다는 전용면적에 포함되지 않지만, 베란다 확장 시 일부가 전용면적으로 포함될 수 있습니다. 분양 광고에서 '확장 시 OO평'이라고 표시하는 것은 베란다를 확장했을 때의 실사용 면적을 의미합니다.\n\n베란다 확장 전: 전용 20평\n베란다 확장 후: 전용 22평 (체감 면적 증가)"
    },
    {
      q: "복층 아파트의 평수는 어떻게 계산하나요?",
      a: "복층 아파트는 각 층의 바닥 면적을 모두 합산하여 계산합니다.\n\n예시:\n1층 바닥 면적: 15평\n2층 바닥 면적: 10평\n총 평수: 25평\n\n메이플렉스(복층 구조)의 경우 층고가 높아 같은 평수라도 더 넓게 느껴집니다."
    }
  ];

  const spaceExamples = [
    { name: "원룸", pyeong: "6~10평", m2: "20~33m²", desc: "1인 가구에 적합한 크기" },
    { name: "오피스텔", pyeong: "10~15평", m2: "33~50m²", desc: "1~2인 가구, 효율적인 공간 구성" },
    { name: "투룸", pyeong: "12~20평", m2: "40~66m²", desc: "1~2인 가구, 방 1개 + 거실" },
    { name: "소형 아파트", pyeong: "20~25평", m2: "66~83m²", desc: "2~3인 가구, 방 2개" },
    { name: "중형 아파트", pyeong: "25~35평", m2: "83~116m²", desc: "3~4인 가구, 방 3개" },
    { name: "대형 아파트", pyeong: "35~50평", m2: "116~165m²", desc: "4인 이상, 방 4개 이상" },
    { name: "주상복합", pyeong: "30~60평", m2: "99~198m²", desc: "고급 주거 공간, 다양한 평형" },
    { name: "단독주택", pyeong: "40평 이상", m2: "132m² 이상", desc: "마당 포함, 넓은 공간" },
  ];

  return (
    <>
      <SEO />
      <div className="bg-gradient-to-br from-slate-50 to-slate-100">
        {/* 타이틀 섹션 */}
        <div className="bg-white border-b py-3 md:py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between max-w-4xl mx-auto gap-4">
              <div className="flex-1 text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">평수 계산기</h1>
                <p className="text-slate-600 text-xs md:text-sm mt-1">
                  평수 ↔ 제곱미터 변환, 3D 공간 시각화, 평당 가격 계산
                </p>
              </div>
              <button
                onClick={handleShare}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                aria-label="공유하기"
              >
                <Share2 className="w-5 h-5" />
                <span className="hidden md:inline">공유</span>
              </button>
            </div>
          </div>
        </div>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        
        {/* 1. 빠른 계산기 섹션 */}
        <section className="mb-8">
          <div className="flex items-center gap-2 md:gap-3 mb-4">
            <Calculator className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">빠른 평수 계산기</h2>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4">
            {/* 계산 모드 선택 */}
            <div className="flex gap-2 mb-4 flex-wrap">
              <button
                onClick={() => setQuickCalcMode('pyeongToM2')}
                className={`flex-1 min-w-[150px] py-3 px-4 rounded-lg border-2 transition-all font-medium ${
                  quickCalcMode === 'pyeongToM2'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                평 → m²
              </button>
              
              <button
                onClick={() => setQuickCalcMode('m2ToPyeong')}
                className={`flex-1 min-w-[150px] py-3 px-4 rounded-lg border-2 transition-all font-medium ${
                  quickCalcMode === 'm2ToPyeong'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                m² → 평
              </button>
              
              <button
                onClick={() => setQuickCalcMode('dimensionToPyeong')}
                className={`flex-1 min-w-[150px] py-3 px-4 rounded-lg border-2 transition-all font-medium ${
                  quickCalcMode === 'dimensionToPyeong'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                가로×세로 → 평
              </button>
            </div>

            {/* 계산 입력 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickCalcMode === 'pyeongToM2' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      평수 입력
                    </label>
                    <input
                      type="text"
                      value={quickPyeong}
                      onChange={handleQuickPyeongChange}
                      className="w-full px-4 py-3 text-lg border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="예: 10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      제곱미터 (m²)
                    </label>
                    <div className="w-full px-4 py-3 text-lg bg-blue-50 border-2 border-blue-200 rounded-lg font-bold text-blue-700">
                      {quickM2} m²
                    </div>
                  </div>
                </>
              )}

              {quickCalcMode === 'm2ToPyeong' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      제곱미터 (m²) 입력
                    </label>
                    <input
                      type="text"
                      value={quickM2}
                      onChange={handleQuickM2Change}
                      className="w-full px-4 py-3 text-lg border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="예: 33.06"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      평수
                    </label>
                    <div className="w-full px-4 py-3 text-lg bg-blue-50 border-2 border-blue-200 rounded-lg font-bold text-blue-700">
                      {quickPyeong} 평
                    </div>
                  </div>
                </>
              )}

              {quickCalcMode === 'dimensionToPyeong' && (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-slate-700">
                        평수 고정 모드
                      </label>
                      <button
                        onClick={() => setAspectRatioLock(!aspectRatioLock)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          aspectRatioLock ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            aspectRatioLock ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    {aspectRatioLock && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                        <p className="text-xs text-blue-800">
                          평수가 고정됩니다. 가로를 변경하면 세로가 자동으로 조정됩니다.
                        </p>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        가로 (m)
                      </label>
                      <input
                        type="text"
                        value={quickWidth}
                        onChange={handleQuickWidthChange}
                        className="w-full px-4 py-3 text-lg border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="예: 4"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        세로 (m)
                      </label>
                      <input
                        type="text"
                        value={quickLength}
                        onChange={handleQuickLengthChange}
                        className="w-full px-4 py-3 text-lg border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="예: 6"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                      <div className="text-sm text-slate-600 mb-2">계산 결과</div>
                      <div className="text-2xl font-bold text-blue-700 mb-1">
                        {quickDimensionResult().pyeong} 평
                      </div>
                      <div className="text-lg text-slate-600">
                        {quickDimensionResult().m2} m²
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={apply3DFromQuick}
              className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
            >
              3D로 공간 확인하기 ↓
            </button>
          </div>
        </section>

        {/* 2. 3D 시각화 섹션 */}
        <section className="mb-8">
          <div className="flex items-center gap-2 md:gap-3 mb-4">
            <Maximize2 className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">3D 공간 시각화</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 왼쪽: 컨트롤 */}
            <div className="lg:col-span-1 space-y-3">
              <div className="bg-white rounded-xl shadow-md p-4">
                <h3 className="font-semibold text-slate-700 mb-2">공간 크기</h3>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm text-slate-600 mb-1 block">가로 (m)</label>
                    <input
                      type="text"
                      value={visualWidth}
                      onChange={handleVisualWidthChange}
                      className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-600 mb-1 block">세로 (m)</label>
                    <input
                      type="text"
                      value={visualLength}
                      onChange={handleVisualLengthChange}
                      className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-md p-4 text-white">
                <h3 className="font-semibold mb-2">계산 결과</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="text-sm opacity-90">평수</span>
                    <span className="text-xl font-bold">{visualAreaInfo().pyeong}평</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm opacity-90">제곱미터</span>
                    <span className="text-xl font-bold">{visualAreaInfo().m2}m²</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-4">
                <h3 className="font-semibold text-slate-700 mb-2">비교 가구</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(comparisonObjects).map(([key, obj]) => {
                    const isSelected = selectedObjects.includes(key);
                    return (
                      <button
                        key={key}
                        onClick={() => toggleObject(key)}
                        className={`p-3 rounded-lg border-2 transition-all text-left ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="font-semibold text-slate-800 text-sm mb-1">{obj.name}</div>
                        <div className="text-xs text-slate-500">
                          {obj.width}×{obj.length}m
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 오른쪽: 3D 뷰 */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden" style={{ height: '600px' }}>
                {visualAreaInfo().m2 > 0 ? (
                  <Canvas shadows>
                    <PerspectiveCamera 
                      makeDefault 
                      position={[
                        visualAreaInfo().width * 0.8, 
                        Math.max(visualAreaInfo().width, visualAreaInfo().length) * 0.8, 
                        visualAreaInfo().length * 1.2
                      ]} 
                    />
                    <Suspense fallback={null}>
                      <Room 
                        width={visualAreaInfo().width} 
                        length={visualAreaInfo().length} 
                        selectedObjects={selectedObjects} 
                      />
                    </Suspense>
                    <OrbitControls
                      enablePan={true}
                      enableZoom={true}
                      enableRotate={true}
                      minDistance={3}
                      maxDistance={100}
                      maxPolarAngle={Math.PI / 2.1}
                    />
                  </Canvas>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-400">
                    크기를 입력해주세요
                  </div>
                )}
              </div>
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  💡 마우스로 드래그하여 회전, 휠로 확대/축소할 수 있습니다
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. 평당 가격 계산기 */}
        <section className="mb-8">
          <div className="flex items-center gap-2 md:gap-3 mb-4">
            <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">평당 가격 계산기</h2>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  평당 가격 (만원)
                </label>
                <input
                  type="text"
                  value={pricePerPyeong}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^\d*\.?\d*$/.test(value)) {
                      setPricePerPyeong(value);
                    }
                  }}
                  className="w-full px-4 py-3 text-lg border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="예: 1000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  평수
                </label>
                <input
                  type="text"
                  value={totalPyeong}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^\d*\.?\d*$/.test(value)) {
                      setTotalPyeong(value);
                    }
                  }}
                  className="w-full px-4 py-3 text-lg border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="예: 30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  총 가격
                </label>
                <div className="w-full px-4 py-3 text-lg bg-green-50 border-2 border-green-200 rounded-lg font-bold text-green-700">
                  {calculateTotalPrice()} 만원
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. 평수 정보 섹션 */}
        <section className="mb-8">
          <div className="flex items-center gap-2 md:gap-3 mb-4">
            <HomeIcon className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">일반적인 공간별 평수</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {spaceExamples.map((space, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-4">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{space.name}</h3>
                <div className="space-y-1 mb-3">
                  <div className="text-lg font-semibold text-blue-600">{space.pyeong}</div>
                  <div className="text-sm text-slate-600">{space.m2}</div>
                </div>
                <p className="text-sm text-slate-500">{space.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. FAQ 섹션 */}
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">자주 묻는 질문 (FAQ)</h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-all"
                >
                  <span className="font-semibold text-slate-800">{faq.q}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 bg-slate-50 border-t">
                    <p className="text-slate-700 whitespace-pre-line">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 6. 평수 계산 공식 설명 */}
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">평수 계산 방법</h2>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">기본 공식</h3>
            
            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="font-mono text-lg text-slate-800 mb-2">
                  1평 = 3.3058 m²
                </div>
                <p className="text-sm text-slate-600">
                  평은 한국과 일본에서 사용하는 넓이 단위입니다
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <div className="font-mono text-lg text-slate-800 mb-2">
                  평수 = 제곱미터 ÷ 3.3058
                </div>
                <p className="text-sm text-slate-600 mt-2">
                  예시: 24m² ÷ 3.3058 = 7.26평
                </p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                <div className="font-mono text-lg text-slate-800 mb-2">
                  제곱미터 = 평수 × 3.3058
                </div>
                <p className="text-sm text-slate-600 mt-2">
                  예시: 10평 × 3.3058 = 33.058m²
                </p>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                <div className="font-mono text-lg text-slate-800 mb-2">
                  평수 = (가로 × 세로) ÷ 3.3058
                </div>
                <p className="text-sm text-slate-600 mt-2">
                  예시: (4m × 6m) ÷ 3.3058 = 24 ÷ 3.3058 = 7.26평
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. 추가 정보 */}
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">알아두면 유용한 정보</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">단위 변환표</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-slate-600">1평</span>
                  <span className="font-semibold">3.3058 m²</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-slate-600">1평</span>
                  <span className="font-semibold">35.58 ft²</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-slate-600">1m²</span>
                  <span className="font-semibold">0.3025 평</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-slate-600">1ft²</span>
                  <span className="font-semibold">0.0281 평</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-600">1평</span>
                  <span className="font-semibold">1.818m × 1.818m</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">실용적인 팁</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>분양 면적과 실사용 면적은 다릅니다 (실사용은 약 60~75%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>베란다 확장 시 평수가 더 넓게 느껴집니다</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>층고가 높으면 같은 평수도 더 넓게 느껴집니다</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>방 구조(장방형 vs 정방형)에 따라 체감 크기가 달라집니다</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 면적 표기법 비교 */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">국가별 면적 단위</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="font-semibold text-slate-800 mb-2">한국/일본</div>
                <div className="text-sm text-slate-600">평 (坪)</div>
                <div className="text-xs text-slate-500 mt-2">1평 = 3.3058m²</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="font-semibold text-slate-800 mb-2">국제 표준</div>
                <div className="text-sm text-slate-600">제곱미터 (m²)</div>
                <div className="text-xs text-slate-500 mt-2">가로 × 세로 미터</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="font-semibold text-slate-800 mb-2">미국/영국</div>
                <div className="text-sm text-slate-600">제곱피트 (ft²)</div>
                <div className="text-xs text-slate-500 mt-2">1ft² = 0.0929m²</div>
              </div>
            </div>
          </div>

          {/* 평수별 면적 비교 */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">평수별 면적 비교</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">평수</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">제곱미터 (m²)</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">제곱피트 (ft²)</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">일반적 용도</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-semibold">10평</td>
                    <td className="px-4 py-3">33.06 m²</td>
                    <td className="px-4 py-3">355.8 ft²</td>
                    <td className="px-4 py-3 text-slate-600">원룸, 소형 오피스텔</td>
                  </tr>
                  <tr className="border-b bg-slate-50">
                    <td className="px-4 py-3 font-semibold">15평</td>
                    <td className="px-4 py-3">49.59 m²</td>
                    <td className="px-4 py-3">533.7 ft²</td>
                    <td className="px-4 py-3 text-slate-600">투룸, 오피스텔</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-semibold">20평</td>
                    <td className="px-4 py-3">66.12 m²</td>
                    <td className="px-4 py-3">711.6 ft²</td>
                    <td className="px-4 py-3 text-slate-600">소형 아파트</td>
                  </tr>
                  <tr className="border-b bg-slate-50">
                    <td className="px-4 py-3 font-semibold">25평</td>
                    <td className="px-4 py-3">82.65 m²</td>
                    <td className="px-4 py-3">889.5 ft²</td>
                    <td className="px-4 py-3 text-slate-600">중소형 아파트</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-semibold">30평</td>
                    <td className="px-4 py-3">99.17 m²</td>
                    <td className="px-4 py-3">1067.4 ft²</td>
                    <td className="px-4 py-3 text-slate-600">중형 아파트</td>
                  </tr>
                  <tr className="border-b bg-slate-50">
                    <td className="px-4 py-3 font-semibold">35평</td>
                    <td className="px-4 py-3">115.70 m²</td>
                    <td className="px-4 py-3">1245.3 ft²</td>
                    <td className="px-4 py-3 text-slate-600">중대형 아파트</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-semibold">40평</td>
                    <td className="px-4 py-3">132.23 m²</td>
                    <td className="px-4 py-3">1423.2 ft²</td>
                    <td className="px-4 py-3 text-slate-600">대형 아파트</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 font-semibold">50평</td>
                    <td className="px-4 py-3">165.29 m²</td>
                    <td className="px-4 py-3">1779.0 ft²</td>
                    <td className="px-4 py-3 text-slate-600">특대형 아파트</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SEO용 이미지 */}
        <section className="mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">
              평수 계산기 서비스 소개
            </h3>
            <div className="relative w-full max-w-3xl mx-auto h-[200px] md:h-[300px]">
              <Image
                src="/평수 계산기.webp"
                alt="평수 계산기 서비스 - 평수와 제곱미터를 쉽게 변환하고 3D로 공간 확인"
                fill
                className="object-contain"
                loading="lazy"
              />
            </div>
            <p className="text-sm text-slate-600 mt-4 text-center">
              레라픽 평수 계산기는 평수 변환, 3D 공간 시각화, 평당 가격 계산 등 부동산 관련 모든 계산을 무료로 제공하는 웹 서비스입니다.
            </p>
          </div>
        </section>
      </div>
      </div>
    </>
  );
}
