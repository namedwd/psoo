import Link from 'next/link';
import { Calculator } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white mt-16 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          {/* 로고 및 소개 */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="w-6 h-6 text-blue-400" />
              <span className="font-bold text-lg">레라픽 평수 계산기</span>
            </div>
            <p className="text-slate-300 text-sm mb-3">
              평수와 제곱미터를 쉽게 계산하고 3D로 확인하세요
            </p>
            <p className="text-slate-400 text-xs">
              www.lerapick.com
            </p>
          </div>

          {/* 바로가기 */}
          <div>
            <h4 className="font-semibold mb-3">바로가기</h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  평수 계산기
                </Link>
              </li>
              <li>
                <Link href="/guide" className="hover:text-white transition-colors">
                  계산 가이드
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  서비스 소개
                </Link>
              </li>
            </ul>
          </div>

          {/* 주요 기능 */}
          <div>
            <h4 className="font-semibold mb-3">주요 기능</h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>• 평수 변환 계산기</li>
              <li>• 3D 공간 시각화</li>
              <li>• 평당 가격 계산</li>
              <li>• 가구 배치 비교</li>
            </ul>
          </div>
        </div>

        {/* 카피라이트 */}
        <div className="text-center border-t border-slate-700 pt-6">
          <p className="text-slate-300 text-sm">
            © 2025 lerapick.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
