import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  FlatList
} from 'react-native';
import React, { useState } from 'react';

import { COLORS } from '../../utils/colors';
import { wp, hp } from "../../utils/responsive";

import Notification from "../../assets/images/notification.svg";
import Profile from "../../assets/images/ProfileG.svg";
import Search from "../../assets/images/Search.svg";

import SideLogo from "../../assets/images/SideLogo.svg";
import Dots from "../../assets/images/dots.svg";
import SideLogo1 from "../../assets/images/sideLogo1.svg";
import Arrow from "../../assets/images/arrow.svg";
import { FONTS } from '../../utils/fonts';
import Bagicon from "../../assets/images/bagicon.svg"
import Money from "../../assets/images/Money.svg";
import Save from "../../assets/images/Save.svg";

const JobScreen = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("suggested Jobs");

  //  Capitalize
  const capitalizeWords = (text) => {
    return text
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const jobs = [
    {
      id: "1",
      logo1: SideLogo,
      logo2: Dots,
      title: "Bartender for a restaurant – Green\nStreet + medical insurance",
      status: "suggested Jobs",
    },
    // {
    //   id: "2",
    //   logo1: SideLogo1,
    //   logo2: Arrow,
    //   title: "Johnny’s Best",
    //   status: "suggested Jobs",
    // },
    // {
    //   id: "3",
    //   title: "Android Developer",
    //   status: "Applied",
    // },
    // {
    //   id: "4",
    //   title: "Node Backend",
    //   status: "Saved",
    // },
  ];

  //  Filter
  const filteredJobs = jobs.filter((job) => {
    const matchTab =
      job.status.toLowerCase() === activeTab.toLowerCase();

    const matchSearch = search
      ? job.title.toLowerCase().includes(search.toLowerCase())
      : true;

    return matchTab && matchSearch;
  });

  //  Render Item
  const renderItem = ({ item }) => {
    const Logo1 = item.logo1;
    const Logo2 = item.logo2;

    return (
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <View style={styles.row}>
            {Logo1 && <Logo1 width={wp("10%")} height={wp("10%")} />}
            <Text style={styles.title}>{item.title}</Text>
          </View>

          {Logo2 && (
            <TouchableOpacity>
              <Logo2 width={wp("5%")} height={wp("5%")} />
            </TouchableOpacity>
          )}
        </View>

        {/* DATE */}
        <View style={{ paddingHorizontal: wp("12%") }}>
          <Text style={{ fontSize: wp("3%"), color: "#999", fontFamily: FONTS.regular }}>
            Published Jan 23
          </Text>
        </View>

        {/* COMPANY */}
        <View style={{ flexDirection: "row", marginTop: hp("0.5%"), paddingHorizontal: wp("11%") }}>
          <Text style={{ fontSize: wp("3%"), fontFamily: FONTS.bold }}>
            Johnny’s Best
          </Text>
          <Text style={{ fontSize: wp("3%"), fontFamily: FONTS.regular }}>
            • Austin, TX (0.9 mi from you)
          </Text>
        </View>

        {/* SHIFT */}
        <View style={{ flexDirection: "row", marginTop: hp("1%"), gap: wp("1%"), paddingHorizontal: wp("11%") }}>
          <Bagicon width={wp("5%")} height={wp("5%")} />
          <Text style={{ fontSize: wp("3%"), fontFamily: FONTS.bold }}>
            Shift position • Shift starts 24 Jan 5 PM
          </Text>
        </View>

        {/* SALARY */}
        <View style={{ flexDirection: "row", marginTop: hp("1%"), gap: wp("1%"), paddingHorizontal: wp("11%") }}>
          <Money width={wp("5%")} height={wp("5%")} />
          <Text style={{ fontSize: wp("3%"), fontFamily: FONTS.bold }}>$250</Text>
        </View>

        {/* DESCRIPTION */}
        <View style={{ marginTop: hp("1%"), gap: wp("1%"), paddingHorizontal: wp("11%") }}>
          <Text style={{ fontSize: wp("3.3%"), fontFamily: FONTS.regular }}>
            URGENT!!
          </Text>
          <Text style={{ fontSize: wp("3%"), fontFamily: FONTS.regular }}>
            Bartender needed for two shifts at the restaurant tomorrow!
          </Text>
        </View>

        {/* LINK */}
        <View style={{ marginTop: hp("1%"), gap: wp("1%"), paddingHorizontal: wp("11%") }}>
          <TouchableOpacity>
            <Text style={{ fontSize: wp("3%"), fontFamily: FONTS.bold, color: COLORS.green }}>
              Learn more
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search width={wp("5%")} height={hp("4%")} />

          <TextInput
            placeholder="Search"
            value={search}
            onChangeText={setSearch}
            style={styles.input}
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity>
          <Notification width={wp("7%")} height={hp("4%")} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Profile width={wp("7%")} height={hp("4%")} />
        </TouchableOpacity>
      </View>

      {/* TABS */}
      <View style={styles.tabs}>
        {["suggested Jobs", "Applied", "Saved"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab
            ]}
          >
            <Text
              style={{
                color: activeTab === tab ? "#00A52C" : "#999",
                fontFamily: FONTS.bold,
                fontSize: wp("3.5%"),
              }}
            >
              {capitalizeWords(tab)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* LIST */}
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}

        ListEmptyComponent={() => {
          // CASE 1: Search is active
          if (search.length > 0) {
            return (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  No matching jobs found
                </Text>
              </View>
            );
          }

          // CASE 2: Applied Tab
          if (activeTab === "Applied") {
            return (
              <View style={styles.emptyContainer}>
                <Bagicon width={wp("15%")} height={hp("13%")} />

                <Text style={{ fontSize: wp("4%"), fontFamily: FONTS.bold }}>
                  You haven’t applied to any jobs so far
                </Text>

                <Text style={{ fontSize: wp("3.2%"), color: "#777", marginTop: hp("1%") }}>
                  Start your search and find a job you’ve been looking for!
                </Text>

                <TouchableOpacity style={styles.searchBtn}>
                  <Search width={wp("5%")} height={hp("3%")} />
                  <Text style={styles.searchText}>Search jobs</Text>
                </TouchableOpacity>
              </View>
            );
          }

          // CASE 3: Saved Tab
          if (activeTab === "Saved") {
            return (
              <View style={styles.emptyContainer}>
                <Save width={wp("15%")} height={hp("13%")} />

                <Text style={{ fontSize: wp("4%"), fontFamily: FONTS.bold }}>
                  Saved jobs will appear here
                </Text>

                <Text style={{ fontSize: wp("3.2%"), color: "#777", marginTop: hp("1%") }}>
               Like a job? Save it to return to it later!
                </Text>

                <TouchableOpacity style={styles.searchBtn}>
                  <Search width={wp("5%")} height={hp("3%")} />
                  <Text style={styles.searchText}>Search jobs</Text>
                </TouchableOpacity>
              </View>
            );
          }

          // CASE 4: Suggested Tab (default)
          return (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No jobs available right now
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default JobScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F7",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: wp("3%"),
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F4F7",
    borderRadius: wp("2%"),
    paddingHorizontal: wp("2%"),
    width: wp("65%"),
  },

  input: {
    flex: 1,
    marginLeft: wp("1%"),
    color: COLORS.text,
    fontSize: wp("3.5%"),
  },

  tabs: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },

  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: hp("1.5%"),
  },

  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#00A52C",
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: wp("2%"),
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  card: {
    paddingVertical: hp("2%"),
    backgroundColor: "#fff",
    marginTop: hp("1%"),
    paddingHorizontal: wp("4%"),
  },

  title: {
    fontWeight: "bold",
    fontSize: wp("3.8%"),
    lineHeight: hp("2.5%"),
    flex: 1,
  },

  status: {
    marginTop: hp("0.5%"),
    color: "#666",
    fontSize: wp("3%"),
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: hp("10%"),
  },

  emptyText: {
    fontSize: wp("4%"),
    color: "#888",
  },
  searchBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.green,
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("5%"),
    borderRadius: 8,
    marginTop: hp("2%"),
    gap: wp("2%"),
  },

  searchText: {
    color: "#fff",
    fontFamily: FONTS.bold,
    fontSize: wp("3.5%"),
  },
});