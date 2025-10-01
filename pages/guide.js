import Link from 'next/link';
import SEO from '../components/SEO';
import { BookOpen, Calculator, Home, ArrowRight } from 'lucide-react';

export default function Guide() {
  return (
    <>
      <SEO 
        title="평수 계산 가이드 - 평수 계산 방법 완벽 정리 | 레라픽"
        description="평수 계산 방법, 분양면적과 전용면적의 차이, 평당 가격 계산법 등 부동산 평수 관련 모든 정보를 상세하게 설명합니다."
        canonical="https://www.lerapick.com/guide"
        keywords="평수 계산 방법, 분양면적, 전용면적, 공급면적, 평수 공식, 평당 가격 계산"
      />
      
      <div className="bg-gradient-to-br from-slate-50 to-slate-100">

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <BookOpen className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-center text-slate-800">
              평수 계산 가이드
            </h1>
          </div>
          <p className="text-xl text-center text-slate-600 mb-12">
            평수 계산의 모든 것을 알려드립니다
          </p>

          {/* 목차 */}
          <nav className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">목차</h2>
            <ul className="space-y-2 text-slate-600">
              <li><a href="#basic" className="hover:text-blue-600">1. 평수란 무엇인가?</a></li>
              <li><a href="#formula" className="hover:text-blue-600">2. 평수 계산 공식</a></li>
              <li><a href="#types" className="hover:text-blue-600">3. 면적의 종류 (전용/공급/계약면적)</a></li>
              <li><a href="#calculation" className="hover:text-blue-600">4. 평수 계산 실전 예제</a></li>
              <li><a href="#price" className="hover:text-blue-600">5. 평당 가격 계산하기</a></li>
              <li><a href="#tips" className="hover:text-blue-600">6. 실용 팁과 주의사항</a></li>
            </ul>
          </nav>

          {/* 1. 평수란? */}
          <section id="basic" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">1. 평수란 무엇인가?</h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <p className="text-slate-700 mb-4 leading-relaxed">
                <strong>평(坪)</strong>은 면적을 나타내는 단위로, 한국과 일본에서 주로 사용됩니다. 
                1평은 약 <strong>3.3058 제곱미터(m²)</strong>에 해당합니다.
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                <p className="text-slate-700">
                  <strong>역사적 배경:</strong> 평은 원래 일본에서 사용하던 단위로, 한국에서는 일제강점기 때부터 
                  사용되기 시작했습니다. 현재는 공식적으로는 제곱미터(m²)를 사용하지만, 
                  부동산 거래에서는 여전히 평 단위가 널리 사용되고 있습니다.
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-3">1평의 크기</h3>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-slate-700 mb-2">1평 = 약 1.818m × 1.818m</p>
                  <p className="text-slate-700">1평 = 3.3058 m² = 35.58 ft²</p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. 계산 공식 */}
          <section id="formula" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">2. 평수 계산 공식</h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <h3 className="font-semibold text-slate-800 mb-2">제곱미터 → 평</h3>
                  <p className="text-2xl font-mono text-blue-700 mb-2">평수 = m² ÷ 3.3058</p>
                  <p className="text-sm text-slate-600">예: 33m² ÷ 3.3058 = 9.98평 ≈ 10평</p>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <h3 className="font-semibold text-slate-800 mb-2">평 → 제곱미터</h3>
                  <p className="text-2xl font-mono text-green-700 mb-2">m² = 평수 × 3.3058</p>
                  <p className="text-sm text-slate-600">예: 10평 × 3.3058 = 33.058m²</p>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                  <h3 className="font-semibold text-slate-800 mb-2">가로 × 세로 → 평</h3>
                  <p className="text-2xl font-mono text-purple-700 mb-2">평수 = (가로m × 세로m) ÷ 3.3058</p>
                  <p className="text-sm text-slate-600">예: (4m × 6m) ÷ 3.3058 = 24 ÷ 3.3058 = 7.26평</p>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
                  <h3 className="font-semibold text-slate-800 mb-2">빠른 암산법</h3>
                  <p className="text-lg font-mono text-orange-700 mb-2">평수 ≈ m² × 0.3</p>
                  <p className="text-lg font-mono text-orange-700 mb-2">m² ≈ 평수 × 3.3</p>
                  <p className="text-sm text-slate-600">정확하진 않지만 빠르게 어림할 수 있습니다</p>
                </div>
              </div>
            </div>
          </section>

          {/* 3. 면적의 종류 */}
          <section id="types" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">3. 면적의 종류</h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <p className="text-slate-700 mb-6">
                부동산에서 사용하는 면적에는 여러 종류가 있으며, 각각 다른 의미를 가집니다.
              </p>

              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">전용면적</h3>
                  <p className="text-slate-700 mb-2">
                    실제로 사용할 수 있는 내부 공간의 면적입니다. 방, 거실, 주방, 화장실 등이 포함됩니다.
                  </p>
                  <div className="bg-slate-50 rounded p-3 text-sm text-slate-600">
                    포함: 방, 거실, 주방, 화장실, 다용도실<br />
                    미포함: 베란다, 발코니 (확장 시 일부 포함 가능)
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">공급면적 (분양면적)</h3>
                  <p className="text-slate-700 mb-2">
                    전용면적 + 주거공용면적(계단, 복도, 벽체 등)을 합친 면적입니다.
                  </p>
                  <div className="bg-slate-50 rounded p-3 text-sm text-slate-600">
                    공급면적 = 전용면적 + 주거공용면적<br />
                    일반적으로 분양 광고에 표시되는 평수가 공급면적입니다
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">계약면적</h3>
                  <p className="text-slate-700 mb-2">
                    공급면적 + 기타공용면적(관리실, 경비실, 주차장 등)을 합친 면적입니다.
                  </p>
                  <div className="bg-slate-50 rounded p-3 text-sm text-slate-600">
                    계약면적 = 공급면적 + 기타공용면적<br />
                    관리비 산정 시 사용되는 경우가 있습니다
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-slate-800 mb-2">💡 실사용 면적 비율</h4>
                <p className="text-slate-700">
                  일반적으로 <strong>공급면적의 60~75%</strong>가 실제 사용 가능한 전용면적입니다.
                  예를 들어 30평 아파트의 경우, 실사용 면적은 약 18~22.5평입니다.
                </p>
              </div>
            </div>
          </section>

          {/* 4. 실전 예제 */}
          <section id="calculation" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">4. 평수 계산 실전 예제</h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">예제 1: 원룸 평수 계산</h3>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-slate-700 mb-2"><strong>문제:</strong> 가로 4m, 세로 6m인 원룸의 평수는?</p>
                    <p className="text-slate-700 mb-2"><strong>계산:</strong></p>
                    <ol className="list-decimal list-inside space-y-1 text-slate-700 ml-4">
                      <li>면적(m²) = 4m × 6m = 24m²</li>
                      <li>평수 = 24m² ÷ 3.3058 = 7.26평</li>
                    </ol>
                    <p className="text-blue-600 font-semibold mt-2">답: 약 7.3평</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">예제 2: 아파트 실사용 면적 계산</h3>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-slate-700 mb-2"><strong>문제:</strong> 공급면적 30평 아파트의 실사용 면적은? (공용면적 비율 30%)</p>
                    <p className="text-slate-700 mb-2"><strong>계산:</strong></p>
                    <ol className="list-decimal list-inside space-y-1 text-slate-700 ml-4">
                      <li>실사용 비율 = 100% - 30% = 70%</li>
                      <li>전용면적 = 30평 × 0.7 = 21평</li>
                      <li>m²로 환산 = 21평 × 3.3058 = 69.42m²</li>
                    </ol>
                    <p className="text-blue-600 font-semibold mt-2">답: 전용면적 약 21평 (69.42m²)</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">예제 3: 제곱미터를 평으로 변환</h3>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-slate-700 mb-2"><strong>문제:</strong> 84m² 아파트는 몇 평?</p>
                    <p className="text-slate-700 mb-2"><strong>계산:</strong></p>
                    <ol className="list-decimal list-inside space-y-1 text-slate-700 ml-4">
                      <li>평수 = 84m² ÷ 3.3058 = 25.41평</li>
                      <li>빠른 암산: 84 × 0.3 = 25.2평 (비슷함!)</li>
                    </ol>
                    <p className="text-blue-600 font-semibold mt-2">답: 약 25평대</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. 평당 가격 */}
          <section id="price" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">5. 평당 가격 계산하기</h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <p className="text-slate-700 mb-6">
                평당 가격은 부동산 가격을 비교할 때 가장 많이 사용하는 지표입니다.
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-3">평당 가격 공식</h3>
                <p className="text-2xl font-mono text-blue-700 mb-2">평당 가격 = 총 가격 ÷ 평수</p>
                <p className="text-2xl font-mono text-blue-700">총 가격 = 평당 가격 × 평수</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">예제: 평당 가격 계산</h4>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-slate-700 mb-2"><strong>상황:</strong> 30평 아파트가 3억원에 매물로 나왔습니다.</p>
                    <p className="text-slate-700 mb-2"><strong>계산:</strong></p>
                    <p className="text-slate-700 ml-4">평당 가격 = 300,000,000원 ÷ 30평 = 10,000,000원/평</p>
                    <p className="text-blue-600 font-semibold mt-2">답: 평당 1,000만원</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">예제: 총 가격 계산</h4>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-slate-700 mb-2"><strong>상황:</strong> 평당 1,500만원인 지역에서 25평 아파트를 구매하려고 합니다.</p>
                    <p className="text-slate-700 mb-2"><strong>계산:</strong></p>
                    <p className="text-slate-700 ml-4">총 가격 = 15,000,000원 × 25평 = 375,000,000원</p>
                    <p className="text-blue-600 font-semibold mt-2">답: 3억 7,500만원</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-slate-800 mb-2">💡 평당 가격 활용 팁</h4>
                <ul className="space-y-2 text-slate-700">
                  <li>• 같은 지역 내 아파트 가격 비교 시 유용합니다</li>
                  <li>• 평당 가격이 높다고 무조건 좋은 매물은 아닙니다 (위치, 층수, 향 등 고려)</li>
                  <li>• 전용면적 기준과 공급면적 기준을 혼동하지 마세요</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 6. 실용 팁 */}
          <section id="tips" className="mb-12 scroll-mt-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">6. 실용 팁과 주의사항</h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">베란다 확장</h3>
                  <p className="text-slate-700">
                    베란다를 확장하면 전용면적이 증가하여 실제 사용 공간이 넓어집니다. 
                    분양 광고에서 "확장 시 OO평"이라고 표시하는 것은 베란다 확장 후의 체감 면적입니다.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">층고의 영향</h3>
                  <p className="text-slate-700">
                    같은 평수라도 층고가 높으면 더 넓게 느껴집니다. 
                    일반 아파트는 2.3~2.5m, 복층이나 고급 주택은 3m 이상인 경우가 많습니다.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">방 구조</h3>
                  <p className="text-slate-700">
                    정사각형에 가까운 방이 장방형 방보다 공간 활용도가 좋고 넓게 느껴집니다. 
                    같은 평수라도 방 배치에 따라 체감 크기가 다릅니다.
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">공용면적 비율</h3>
                  <p className="text-slate-700">
                    공용면적 비율이 낮을수록 실사용 면적이 넓습니다. 
                    일반적으로 소형 아파트일수록 공용면적 비율이 높습니다.
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">주의사항</h3>
                  <p className="text-slate-700">
                    부동산 거래 시 반드시 등기부등본과 건축물대장을 확인하여 정확한 면적을 파악하세요. 
                    광고나 중개업소의 설명만 믿고 계약하면 안 됩니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">지금 바로 평수를 계산해보세요!</h2>
            <p className="mb-6">3D 시각화로 실제 공간을 확인할 수 있습니다</p>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all font-semibold text-lg shadow-lg"
            >
              <Calculator className="w-5 h-5" />
              평수 계산기 사용하기
              <ArrowRight className="w-5 h-5" />
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
