import Link from 'next/link';
import SEO from '../components/SEO';
import { Calculator, Home, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <>
      <SEO 
        title="레라픽 평수 계산기 소개 | 무료 부동산 계산 도구"
        description="레라픽 평수 계산기는 평수 변환, 3D 공간 시각화, 평당 가격 계산 등 부동산 관련 모든 계산을 무료로 제공하는 웹 서비스입니다."
        canonical="https://www.lerapick.com/about"
      />
      
      <div className="bg-gradient-to-br from-slate-50 to-slate-100">

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-8 text-slate-800">
            레라픽 평수 계산기
          </h1>
          <p className="text-xl text-center text-slate-600 mb-12">
            부동산 평수 계산을 쉽고 정확하게
          </p>

          {/* 주요 기능 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">주요 기능</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <Calculator className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-3">빠른 평수 계산</h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• 평 ↔ 제곱미터 즉시 변환</li>
                  <li>• 가로 × 세로로 평수 계산</li>
                  <li>• 제곱피트 변환 지원</li>
                  <li>• 평수 고정 모드</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <Home className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-3">3D 공간 시각화</h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• 실제 크기 3D 뷰어</li>
                  <li>• 가구 배치 비교</li>
                  <li>• 360도 회전 가능</li>
                  <li>• 1m 격자 표시</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <Calculator className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-3">평당 가격 계산</h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• 총 가격 자동 계산</li>
                  <li>• 평당 단가 비교</li>
                  <li>• 부동산 투자 분석</li>
                  <li>• 실시간 계산</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <Home className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-3">상세 정보 제공</h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• 공간별 평수 예시</li>
                  <li>• FAQ 10개 이상</li>
                  <li>• 평수 계산 가이드</li>
                  <li>• 단위 변환표</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 왜 레라픽인가? */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">왜 레라픽 평수 계산기인가?</h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    1. 완전 무료
                  </h3>
                  <p className="text-slate-600">
                    회원가입, 로그인, 광고 없이 모든 기능을 무료로 사용할 수 있습니다.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    2. 정확한 계산
                  </h3>
                  <p className="text-slate-600">
                    1평 = 3.3058m²의 정확한 환산 비율을 사용하여 오차 없이 계산합니다.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    3. 직관적인 3D 시각화
                  </h3>
                  <p className="text-slate-600">
                    평수를 숫자로만 보는 것이 아니라, 실제 공간을 3D로 확인하여 크기를 체감할 수 있습니다.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    4. 모바일 최적화
                  </h3>
                  <p className="text-slate-600">
                    스마트폰, 태블릿, PC 등 모든 기기에서 편리하게 사용할 수 있습니다.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    5. 풍부한 정보
                  </h3>
                  <p className="text-slate-600">
                    단순 계산을 넘어 분양면적, 전용면적, 평당 가격 등 부동산 관련 모든 정보를 제공합니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 사용 대상 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">이런 분들께 추천합니다</h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8">
              <ul className="space-y-4 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 text-xl">✓</span>
                  <span><strong>아파트 구매를 고민하시는 분</strong> - 평수별 크기를 비교하고 예산을 계산하세요</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 text-xl">✓</span>
                  <span><strong>인테리어를 계획하시는 분</strong> - 가구 배치를 미리 시뮬레이션해보세요</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 text-xl">✓</span>
                  <span><strong>부동산 투자자</strong> - 평당 가격을 비교하고 투자 가치를 분석하세요</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 text-xl">✓</span>
                  <span><strong>부동산 중개업자</strong> - 고객에게 공간을 쉽게 설명하세요</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 text-xl">✓</span>
                  <span><strong>이사를 준비하시는 분</strong> - 새 집의 크기를 미리 파악하세요</span>
                </li>
              </ul>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold text-lg shadow-lg"
            >
              평수 계산하러 가기
              <ArrowRight className="w-5 h-5" />
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
