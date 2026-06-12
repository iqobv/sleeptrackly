import { LegalContent } from '@/components/Layout/LegalContent/LegalContent';
import { TERMS_AND_CONDITIONS_HTML } from '@/constants/legal/termsAndConditions.constants';

export default function TermsAndConditionsPage() {
	return <LegalContent html={TERMS_AND_CONDITIONS_HTML} />;
}
