import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PrivacyPolicy = ({ navigation }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const lastUpdated = 'December 15, 2024';

  const sections = [
    {
      id: 1,
      title: 'Information We Collect',
      icon: 'information-circle-outline',
      content: `We collect information that you provide directly to us, including:

• Personal Information: Name, email address, phone number, date of birth, PAN card, Aadhaar card, and address.

• Financial Information: Bank account details, income information, employment details, credit history, and loan application data.

• Device Information: Device type, operating system, unique device identifiers, and mobile network information.

• Usage Information: How you interact with our app, pages visited, features used, and time spent on the app.

• Location Information: With your permission, we may collect precise location data to verify your address and provide location-based services.`,
    },
    {
      id: 2,
      title: 'How We Use Your Information',
      icon: 'checkmark-circle-outline',
      content: `We use the collected information for the following purposes:

• Processing loan applications and managing your account
• Verifying your identity and conducting KYC (Know Your Customer) procedures
• Assessing creditworthiness and making lending decisions
• Communicating with you about your loan status, EMI payments, and account updates
• Providing customer support and responding to your inquiries
• Improving our services and developing new features
• Detecting and preventing fraud, security threats, and illegal activities
• Complying with legal obligations and regulatory requirements
• Sending promotional offers and updates (with your consent)`,
    },
    {
      id: 3,
      title: 'Information Sharing',
      icon: 'people-outline',
      content: `We may share your information with:

• Credit Bureaus: To assess your credit history and report your loan repayment behavior.

• Banking Partners: To process loan disbursements and EMI collections.

• Service Providers: Third-party vendors who help us operate our services (e.g., payment processors, SMS providers, cloud storage).

• Legal Authorities: When required by law or to protect our rights and safety.

• Business Transfers: In case of merger, acquisition, or sale of assets.

We do not sell your personal information to third parties for their marketing purposes.`,
    },
    {
      id: 4,
      title: 'Data Security',
      icon: 'shield-checkmark-outline',
      content: `We implement industry-standard security measures to protect your information:

• End-to-end encryption for data transmission
• Secure storage with encrypted databases
• Regular security audits and vulnerability assessments
• Multi-factor authentication for account access
• Restricted access to personal data on a need-to-know basis
• Regular employee training on data protection

However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.`,
    },
    {
      id: 5,
      title: 'Your Rights and Choices',
      icon: 'hand-left-outline',
      content: `You have the following rights regarding your personal information:

• Access: Request a copy of your personal data we hold.
• Correction: Request correction of inaccurate information.
• Deletion: Request deletion of your data (subject to legal requirements).
• Opt-out: Unsubscribe from marketing communications.
• Portability: Request transfer of your data to another service.
• Consent Withdrawal: Withdraw consent for data processing where applicable.

To exercise these rights, contact us through the app's Help & Support section or email privacy@loanease.com.`,
    },
    {
      id: 6,
      title: 'Data Retention',
      icon: 'time-outline',
      content: `We retain your personal information for as long as necessary to:

• Provide our services and maintain your account
• Comply with legal, regulatory, and tax requirements
• Resolve disputes and enforce our agreements
• Prevent fraud and maintain security

After you close your account, we may retain certain information for up to 7 years as required by banking regulations and law enforcement purposes.`,
    },
    {
      id: 7,
      title: 'Cookies and Tracking',
      icon: 'analytics-outline',
      content: `We use cookies and similar technologies to:

• Remember your preferences and settings
• Analyze app usage and improve performance
• Deliver personalized content and advertisements
• Prevent fraudulent activity

You can control cookie settings through your device settings. Note that disabling cookies may affect app functionality.`,
    },
    {
      id: 8,
      title: 'Third-Party Services',
      icon: 'link-outline',
      content: `Our app may contain links to third-party services (e.g., payment gateways, social media). We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies.

Third-party services we integrate with:
• Payment Gateways: For processing transactions
• Credit Bureaus: For credit score checks
• SMS/Email Services: For notifications
• Analytics Providers: For app performance monitoring`,
    },
    {
      id: 9,
      title: 'Children\'s Privacy',
      icon: 'person-outline',
      content: `Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will take steps to delete such information immediately.

If you are a parent or guardian and believe your child has provided us with information, please contact us.`,
    },
    {
      id: 10,
      title: 'Changes to Privacy Policy',
      icon: 'document-text-outline',
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of significant changes through:

• In-app notifications
• Email notifications
• Updates on our website

Your continued use of our services after changes indicates acceptance of the updated policy. We encourage you to review this policy periodically.`,
    },
    {
      id: 11,
      title: 'Contact Us',
      icon: 'mail-outline',
      content: `If you have questions or concerns about this Privacy Policy or our data practices, please contact us:

Email: privacy@loanease.com
Phone: +91 1800-XXX-XXXX (Toll Free)
Address: LoanEase Pvt Ltd, 123 Business District, Mumbai, Maharashtra 400001, India

You can also reach us through the Help & Support section in the app.

Data Protection Officer: dpo@loanease.com`,
    },
  ];

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Intro Section */}
        <View style={styles.introCard}>
          <View style={styles.introIconContainer}>
            <Icon name="shield-checkmark" size={48} color="#5D6AFF" />
          </View>
          <Text style={styles.introTitle}>Your Privacy Matters</Text>
          <Text style={styles.introText}>
            At LoanEase, we are committed to protecting your privacy and personal
            information. This policy explains how we collect, use, and safeguard your data.
          </Text>
          <View style={styles.updateBadge}>
            <Icon name="calendar-outline" size={16} color="#6B7280" />
            <Text style={styles.updateText}>Last Updated: {lastUpdated}</Text>
          </View>
        </View>

        {/* Important Notice */}
        <View style={styles.noticeCard}>
          <View style={styles.noticeHeader}>
            <Icon name="alert-circle" size={24} color="#F59E0B" />
            <Text style={styles.noticeTitle}>Important Notice</Text>
          </View>
          <Text style={styles.noticeText}>
            By using LoanEase, you consent to the collection and use of your information as
            described in this Privacy Policy. Please read carefully to understand our
            practices.
          </Text>
        </View>

        {/* Privacy Sections */}
        <View style={styles.sectionsContainer}>
          {sections.map((section, index) => (
            <TouchableOpacity
              key={section.id}
              style={styles.sectionCard}
              onPress={() => toggleSection(section.id)}
              activeOpacity={0.7}
            >
              <View style={styles.sectionHeader}>
                <View style={styles.sectionLeft}>
                  <View style={styles.sectionIconContainer}>
                    <Icon name={section.icon} size={24} color="#5D6AFF" />
                  </View>
                  <View style={styles.sectionTitleContainer}>
                    <Text style={styles.sectionNumber}>{index + 1}</Text>
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                  </View>
                </View>
                <Icon
                  name={expandedSection === section.id ? 'chevron-up' : 'chevron-down'}
                  size={24}
                  color="#9CA3AF"
                />
              </View>
              {expandedSection === section.id && (
                <View style={styles.sectionContent}>
                  <Text style={styles.sectionText}>{section.content}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Icon name="bulb-outline" size={28} color="#5D6AFF" />
            <Text style={styles.summaryTitle}>Quick Summary</Text>
          </View>
          <View style={styles.summaryPoints}>
            <View style={styles.summaryPoint}>
              <Icon name="checkmark-circle" size={20} color="#10B981" />
              <Text style={styles.summaryPointText}>
                We collect only necessary information for loan processing
              </Text>
            </View>
            <View style={styles.summaryPoint}>
              <Icon name="checkmark-circle" size={20} color="#10B981" />
              <Text style={styles.summaryPointText}>
                Your data is encrypted and securely stored
              </Text>
            </View>
            <View style={styles.summaryPoint}>
              <Icon name="checkmark-circle" size={20} color="#10B981" />
              <Text style={styles.summaryPointText}>
                We never sell your personal information
              </Text>
            </View>
            <View style={styles.summaryPoint}>
              <Icon name="checkmark-circle" size={20} color="#10B981" />
              <Text style={styles.summaryPointText}>
                You have control over your data and privacy settings
              </Text>
            </View>
          </View>
        </View>

        {/* Contact Support */}
        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Have Questions?</Text>
          <Text style={styles.contactText}>
            If you have any questions about this Privacy Policy, please don't hesitate to
            contact our support team.
          </Text>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => navigation.navigate('HelpSupport')}
          >
            <Icon name="chatbubble-ellipses-outline" size={20} color="white" />
            <Text style={styles.contactButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#5D6AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  placeholder: {
    width: 40,
  },
  introCard: {
    backgroundColor: 'white',
    margin: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  introIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F1FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  introText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  updateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  updateText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  noticeCard: {
    backgroundColor: '#FEF3C7',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  noticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#92400E',
  },
  noticeText: {
    fontSize: 13,
    color: '#78350F',
    lineHeight: 18,
  },
  sectionsContainer: {
    paddingHorizontal: 20,
  },
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  sectionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0F1FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitleContainer: {
    flex: 1,
  },
  sectionNumber: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  sectionContent: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  sectionText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
  },
  summaryCard: {
    backgroundColor: 'white',
    margin: 20,
    marginTop: 8,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  summaryPoints: {
    gap: 12,
  },
  summaryPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  summaryPointText: {
    flex: 1,
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  contactCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  contactButton: {
    backgroundColor: '#5D6AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  contactButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  bottomSpace: {
    height: 20,
  },
});

export default PrivacyPolicy;