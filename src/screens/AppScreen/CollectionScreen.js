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

import Dots from "../../assets/images/dots.svg";
import { FONTS } from '../../utils/fonts';
import Bagicon from "../../assets/images/bagicon.svg"
import Profile1 from "../../assets/images/profile.svg"
import Button from "../../assets/images/btn.svg";

const CollectionScreen = () => {
  const [search, setSearch] = useState("");
  const [SearchSec, setSearchSec] = useState("");
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
      logo1: Profile,
      logo2: Dots,
      title: "Jimmy White",
      subtitle: "Austin, TX",
      status: "Connections",
    },
     {
      id: "2",
      logo1: Profile,
      logo2: Dots,
      title: "Jimmy White",
      subtitle: "Austin, TX",
      status: "Connections",
    },
     {
      id: "3",
      logo1: Profile,
      logo2: Dots,
      title: "Jimmy White",
      subtitle: "Austin, TX",
      status: "Connections",
    },
     {
      id: "4",
      logo1: Profile,
      logo2: Dots,
      title: "Jimmy White",
      subtitle: "Austin, TX",
      status: "Connections",
    },
     {
      id: "5",
      logo1: Profile,
      logo2: Dots,
      title: "Jimmy White",
      subtitle: "Austin, TX",
      status: "Connections",
    },
     {
      id: "6",
      logo1: Profile,
      logo2: Dots,
      title: "Jimmy White",
      subtitle: "Austin, TX",
      status: "Connections",
    },
     {
      id: "7",
      logo1: Profile,
      logo2: Dots,
      title: "Jimmy White",
      subtitle: "Austin, TX",
      status: "Following",
    },
     {
      id: "8",
      logo1: Profile,
      logo2: Dots,
      title: "Jimmy White",
      subtitle: "Austin, TX",
      status: "Following",
    },
     {
      id: "9",
      logo1: Profile,
      logo2: Dots,
      title: "Jimmy White",
      subtitle: "Austin, TX",
      status: "Following",
    },
     {
      id: "10",
      logo1: Profile,
      logo2: Dots,
      title: "Jimmy White",
      subtitle: "Austin, TX",
      status: "Following",
    },
     {
      id: "11",
      logo1: Profile,
      logo2: Dots,
      title: "Jimmy White",
      subtitle: "Austin, TX",
      status: "Following",
    },
     {
      id: "12",
      logo1: Profile,
      logo2: Dots,
      title: "Jimmy White",
      subtitle: "Austin, TX",
      status: "Following",
    },


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

          {/* LEFT SIDE */}
          <View style={styles.leftSection}>
            {Logo1 && <Logo1 width={wp("13%")} height={wp("10%")} />}

            <View style={{ marginLeft: wp("2%") }}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.title1}>
                {item.subtitle}
              </Text>
            </View>
          </View>

          {/* RIGHT SIDE */}
          <View style={styles.rightSection}>

           <View>
            <TouchableOpacity>
               <Button width={wp("25%")} height={hp("5%")} />
            </TouchableOpacity>
           </View>

            {Logo2 && (
              <TouchableOpacity style={{ marginLeft: wp("2%") }}>
                <Logo2 width={wp("6%")} height={wp("6%")} />
              </TouchableOpacity>
            )}

          </View>

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
        {["Connections", "Following", "Pending Connections"].map((tab) => (
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
                fontSize: wp("3.1%"),
              }}
            >
              {capitalizeWords(tab)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.header1}>
        <View style={styles.searchContainer1}>
          <Search width={wp("5%")} height={hp("4%")} />

          <TextInput
            placeholder="Search"
            value={SearchSec}
            onChangeText={setSearchSec}
            style={styles.input}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* LIST */}
      <View>
        <FlatList
          data={jobs}
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
            if (activeTab === "Connections") {
              return (
                <View style={styles.emptyContainer}>
                  <Profile1 width={wp("15%")} height={hp("13%")} />

                  <Text style={{ fontSize: wp("4%"), fontFamily: FONTS.bold }}>
                    You don’t have any connections
                  </Text>

                  <Text style={{ fontSize: wp("3.2%"), color: "#777", marginTop: hp("1%") }}>
                    It’s better when you have company! Find people to follow
                  </Text>

                  <TouchableOpacity style={styles.searchBtn}>
                    <Search width={wp("5%")} height={hp("3%")} />
                    <Text style={styles.searchText}>Find people to cannect with</Text>
                  </TouchableOpacity>
                </View>
              );
            }

            // CASE 3: Saved Tab
            if (activeTab === "Following") {
              return (
                <View style={styles.emptyContainer}>
                  <Bagicon width={wp("15%")} height={hp("13%")} />

                  <Text style={{ fontSize: wp("4%"), fontFamily: FONTS.bold }}>
                    You don’t follow any businesses
                  </Text>

                  <Text style={{ fontSize: wp("3.2%"), color: "#777", marginTop: hp("1%") }}>
                    It’s better when you have company! Find people to follow
                  </Text>

                  <TouchableOpacity style={styles.searchBtn}>
                    <Search width={wp("5%")} height={hp("3%")} />
                    <Text style={styles.searchText}>Find businesses to follow</Text>
                  </TouchableOpacity>
                </View>
              );
            }

            if (activeTab === "Pending Connections") {
              return (
                <View style={styles.emptyContainer}>
                  <Profile1 width={wp("15%")} height={hp("13%")} />

                  <Text style={{ fontSize: wp("4%"), fontFamily: FONTS.bold }}>
                    You don’t have any connections
                  </Text>

                  <Text style={{ fontSize: wp("3.2%"), color: "#777", marginTop: hp("1%") }}>
                    It’s better when you have company! Find people to follow
                  </Text>

                  <TouchableOpacity style={styles.searchBtn}>
                    <Search width={wp("5%")} height={hp("3%")} />
                    <Text style={styles.searchText}>Find people to connect with</Text>
                  </TouchableOpacity>
                </View>
              );
            }
          }}
        />
      </View>
    </View>
  );
};

export default CollectionScreen;

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
  header1: {
    backgroundColor: "#ffffff",
    padding: wp("3%"),
    marginTop: wp("3%"),
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F4F7",
    borderRadius: wp("3%"),
    paddingHorizontal: wp("2%"),
    width: wp("65%"),
  },
  searchContainer1: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: wp("3%"),
    paddingHorizontal: wp("2%"),
    width: wp("65%"),
    borderColor: "#cdd0d4",
    borderWidth: 1
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
    gap: wp("2%"),
    width: wp("80%")
  },

 rowBetween: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

leftSection: {
  flexDirection: "row",
  alignItems: "center",
  flex: 1, 
},

rightSection: {
  flexDirection: "row",
  alignItems: "center",
},

title: {
  fontSize: wp("3.8%"),
  fontFamily: FONTS.bold,
  width: wp("45%"), 
},

title1: {
  fontSize: wp("3%"),
  fontFamily: FONTS.regular,
  color: "#999",
},

  card: {
    paddingVertical: hp("2%"),
    backgroundColor: "#fff",
    marginTop: hp("0.2%"),
    paddingHorizontal: wp("3%"),
  },

  title: {
    fontFamily: FONTS.bold,
    fontSize: wp("3.8%"),
    lineHeight: hp("2.5%"),
    flex: 1,
  },
  title1: {
    fontFamily: FONTS.regular,
    fontSize: wp("3%"),
    lineHeight: hp("2.5%"),
    flex: 1,
    color: COLORS.gray
  },

  status: {
    marginTop: hp("0.5%"),
    color: "#666",
    fontSize: wp("3%"),
  },

  emptyContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,

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