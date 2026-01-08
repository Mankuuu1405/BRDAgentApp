import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AboutApp = ({ navigation }) => {
  const appInfo = {
    version: '1.0.0',
    buildNumber: '100',
    lastUpdated: 'December 15, 2024',
  };

  const features = [
    {
      id: 1,
      icon: 'flash-outline',
      title: 'Quick Loan Approval',
      description: 'Get your loan approved within 24-48 hours with minimal documentation',
    },
    {
      id: 2,
      icon: 'shield-checkmark-outline',
      title: 'Secure & Safe',
      description: 'Bank-grade security with end-to-end encryption for all your data',
    },
    {
      id: 3,
      icon: 'trending-up-outline',
      title: 'Track Applications',
      description: 'Real-time tracking of your loan application status',
    },
    {
      id: 4,
      icon: 'wallet-outline',
      title: 'Easy EMI Payments',
      description: 'Multiple payment options for hassle-free EMI payments',
    },
    {
      id: 5,
      icon: 'people-outline',
      title: '24/7 Support',
      description: 'Round-the-clock customer support via call, WhatsApp, and email',
    },
    {
      id: 6,
      icon: 'speedometer-outline',
      title: 'Credit Score Tracking',
      description: 'Monitor your credit score and get tips to improve it',
    },
  ];

  const socialLinks = [
    {
      id: 1,
      name: 'Facebook',
      icon: 'logo-facebook',
      color: '#1877F2',
      url: 'https://facebook.com',
    },
    {
      id: 2,
      name: 'Twitter',
      icon: 'logo-twitter',
      color: '#1DA1F2',
      url: 'https://twitter.com',
    },
    {
      id: 3,
      name: 'Instagram',
      icon: 'logo-instagram',
      color: '#E4405F',
      url: 'https://instagram.com',
    },
    {
      id: 4,
      name: 'LinkedIn',
      icon: 'logo-linkedin',
      color: '#0A66C2',
      url: 'https://linkedin.com',
    },
  ];

  const handleSocialLink = (url) => {
    Linking.openURL(url).catch(() => {});
  };

  const handleWebsite = () => {
    Linking.openURL('https://www.loanapp.com').catch(() => {});
  };

  const handleRateApp = () => {
    // Platform-specific app store links
    const playStoreUrl = 'market://details?id=com.loanapp';
    Linking.openURL(playStoreUrl).catch(() => {});
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
        <Text style={styles.headerTitle}>About This App</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* App Logo & Name */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Icon name="wallet" size={60} color="#5D6AFF" />
          </View>
          <Text style={styles.appName}>LoanEase</Text>
          <Text style={styles.appTagline}>Your Trusted Loan Partner</Text>
          <View style={styles.versionBadge}>
            <Text style={styles.versionText}>Version {appInfo.version}</Text>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>About LoanEase</Text>
          <Text style={styles.aboutText}>
            LoanEase is a comprehensive loan management platform designed exclusively for
            borrowers. We simplify the loan application process, making it faster, easier,
            and more transparent. Our mission is to provide accessible financial solutions
            to help you achieve your goals.
          </Text>
          <Text style={styles.aboutText}>
            With cutting-edge technology and a customer-first approach, we ensure that your
            loan journey is smooth from application to repayment. Trust LoanEase for all
            your borrowing needs.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          {features.map((feature) => (
            <View key={feature.id} style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Icon name={feature.icon} size={28} color="#5D6AFF" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* App Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>App Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>{appInfo.version}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Build Number</Text>
            <Text style={styles.infoValue}>{appInfo.buildNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Last Updated</Text>
            <Text style={styles.infoValue}>{appInfo.lastUpdated}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Size</Text>
            <Text style={styles.infoValue}>25.4 MB</Text>
          </View>
        </View>

        {/* Rate App */}
        <View style={styles.card}>
          <View style={styles.rateHeader}>
            <Icon name="star" size={28} color="#F59E0B" />
            <Text style={styles.rateTitle}>Enjoying LoanEase?</Text>
          </View>
          <Text style={styles.rateText}>
            Rate us on the Play Store and help others discover our app!
          </Text>
          <TouchableOpacity style={styles.rateButton} onPress={handleRateApp}>
            <Icon name="star-outline" size={20} color="white" />
            <Text style={styles.rateButtonText}>Rate Us</Text>
          </TouchableOpacity>
        </View>

        {/* Social Media */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connect With Us</Text>
          <View style={styles.socialContainer}>
            {socialLinks.map((social) => (
              <TouchableOpacity
                key={social.id}
                style={[styles.socialButton, { backgroundColor: social.color + '15' }]}
                onPress={() => handleSocialLink(social.url)}
              >
                <Icon name={social.icon} size={32} color={social.color} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Contact & Links */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Contact & Links</Text>
          <TouchableOpacity style={styles.linkRow} onPress={handleWebsite}>
            <Icon name="globe-outline" size={24} color="#5D6AFF" />
            <Text style={styles.linkText}>www.loanease.com</Text>
            <Icon name="open-outline" size={20} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => navigation.navigate('PrivacyPolicy')}
          >
            <Icon name="shield-checkmark-outline" size={24} color="#5D6AFF" />
            <Text style={styles.linkText}>Privacy Policy</Text>
            <Icon name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => navigation.navigate('TermsConditions')}
          >
            <Icon name="document-text-outline" size={24} color="#5D6AFF" />
            <Text style={styles.linkText}>Terms & Conditions</Text>
            <Icon name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => navigation.navigate('HelpSupport')}
          >
            <Icon name="help-circle-outline" size={24} color="#5D6AFF" />
            <Text style={styles.linkText}>Help & Support</Text>
            <Icon name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Copyright */}
        <View style={styles.copyrightSection}>
          <Text style={styles.copyrightText}>© 2024 LoanEase. All rights reserved.</Text>
          <Text style={styles.copyrightSubtext}>
            Made with ❤️ for borrowers in India
          </Text>
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
  logoSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  appTagline: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 12,
  },
  versionBadge: {
    backgroundColor: '#5D6AFF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  versionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  aboutText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 12,
    textAlign: 'justify',
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F0F1FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  rateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  rateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  rateText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  rateButton: {
    backgroundColor: '#5D6AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    gap: 8,
  },
  rateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
  socialButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  linkText: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
  },
  copyrightSection: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  copyrightText: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  copyrightSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  bottomSpace: {
    height: 20,
  },
});

export default AboutApp;