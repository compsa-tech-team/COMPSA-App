"use dom";
import React from "react";

// import RoomBooker from "components/calendar/Room-Booker";
// import Card from "components/card/card";
// import { DateTime } from "luxon";
// import { useRouter } from "next/navigation";
// import { useCallback, useEffect, useState } from "react";
// import { nextDays, prepBlocks } from "utils/calendarUtils";

export default function RoomBooking() {
  // const [userBookings, setUserBookings] = useState({
  //   start: undefined,
  //   end: undefined,
  //   name: undefined,
  // });
  // const [isLoading, setIsLoading] = useState(true);
  // const [date, setDate] = useState(new Date());
  // const [roomDetails, setRoomDetails] = useState([]);
  // const [blockedRooms, setBlockedRooms] = useState([]);
  // const [bookings, setBookings] = useState({});
  // const [roomFilter, setRoomFilter] = useState(undefined);
  // const [allBlocked, setAllBlocked] = useState([]);
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // useEffect(() => {
  //   if (!mounted) return;

  //   const setupPage = async () => {
  //     try {
  //       setIsLoading(true);

  //       const rooms = await fetch("/api/room-booking/rooms", {
  //         cache: "no-store",
  //         headers: {
  //           "Cache-Control": "no-cache",
  //         },
  //       });
  //       const roomJson = await rooms.json();
  //       setRoomDetails(roomJson["data"]);

  //       const blockData = await fetch("/api/room-booking/room-blocks", {
  //         cache: "no-store",
  //         headers: {
  //           "Cache-Control": "no-cache",
  //         },
  //       });
  //       const blockJson = await blockData.json();
  //       setBlockedRooms(prepBlocks(blockJson["data"]));
  //       setIsLoading(false);
  //     } catch (e) {
  //       console.error("Error in setupPage:", e);
  //       setIsLoading(false);
  //     }
  //   };

  //   setupPage();
  // }, [mounted]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   const isBlocked = [];
  //   for (const block of blockedRooms) {
  //     if (date >= block.start_time && date <= block.end_time) {
  //       isBlocked.push(block.id);
  //     }
  //   }

  //   setAllBlocked(isBlocked);

  //   setIsLoading(false);
  // }, [roomFilter, date]);

  // const getBookings = useCallback(async () => {
  //   if (!roomDetails || !date) {
  //     return;
  //   }
  //   const books = {};

  //   try {
  //     for (const room of roomDetails) {
  //       // Check if this room is blocked for the selected date
  //       const isRoomBlocked = blockedRooms.some(
  //         (block) =>
  //           block.room_id === room.id &&
  //           date >= new Date(block.start_time) &&
  //           date <= new Date(block.end_time)
  //       );

  //       if (isRoomBlocked) {
  //         // Room is blocked, don't fetch availability
  //         books[room.id] = {
  //           blocked: true,
  //           reason:
  //             blockedRooms.find(
  //               (block) =>
  //                 block.room_id === room.id &&
  //                 date >= new Date(block.start_time) &&
  //                 date <= new Date(block.end_time)
  //             )?.reason || "Room unavailable",
  //         };
  //       } else {
  //         // Room is not blocked, fetch availability normally
  //         // Use Luxon to ensure we send the correct Toronto date, not UTC date
  //         const torontoDate =
  //           DateTime.fromJSDate(date).setZone("America/Toronto");
  //         const dateParam = torontoDate.toFormat("yyyy-MM-dd");

  //         const roomBooking = await fetch(
  //           `/api/room-booking/availability?room_id=${room.id}&date=${dateParam}`,
  //           {
  //             cache: "no-store",
  //             headers: {
  //               "Cache-Control": "no-cache",
  //             },
  //           }
  //         );
  //         const bookingJson = await roomBooking.json();
  //         books[room.id] = {
  //           blocked: false,
  //           slots: bookingJson["slots"] || [],
  //         };
  //       }
  //     }

  //     setBookings(books);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error("Error in getBookings:", error);
  //     setIsLoading(false);
  //   }
  // }, [roomDetails, date, blockedRooms]);

  // useEffect(() => {
  //   if (roomDetails && blockedRooms && date) {
  //     setIsLoading(true);
  //     getBookings();
  //   }
  // }, [date, roomDetails, blockedRooms, getBookings]);

  // const filteredDetails = roomDetails
  //   ? roomDetails.filter(
  //       (room) =>
  //         (roomFilter === undefined || room.id === Number(roomFilter)) &&
  //         !allBlocked.includes(room.id)
  //     )
  //   : [];
  // const curRoom = userBookings.name
  //   ? roomDetails.filter((room) => room.id === userBookings.name)[0]
  //   : "";
  // const maxDate = new Date();
  // maxDate.setDate(maxDate.getDate() + 3);

  // const router = useRouter();
  // const handleRequest = () => {
  //   if (!userBookings.start || !userBookings.end || !curRoom) return;

  //   const params = new URLSearchParams({
  //     roomName: curRoom.name,
  //     roomId: curRoom.id.toString(),
  //     start: userBookings.start.toISOString(),
  //     end: userBookings.end.toISOString(),
  //   });

  //   router.push(`/booking-details?${params.toString()}`);
  // };

  return (
    <main className="compsa-container flex gap-4 items-center justify-center pt-24">
      {/* Frontend Team: Build your components here */}
      <div className="flex flex-col gap-6 max-w-xs sm:max-w-lg md:max-w-screen-xl">
        <h1 className="font-bold text-4xl sm:text-5xl text-compsa-yellow justify-self-start w-full">
          CASLab Room Booking
        </h1>
        <h2 className="text-compsa-white text-base sm:text-lg">
          Reserve study rooms in the CASLab quickly and easily.
        </h2>
        <div className="flex flex-col xl:flex-row gap-4">
          <div className="flex flex-col gap-4">
            <div className=" flex flex-col xl:flex-row gap-4 xl:h-14">
              <div className="w-full xl:w-3/5 relative text-lg sm:text-base">
                <div>
                  <select
                    // onChange={(e) => setDate(new Date(e.target.value))}
                    className="appearance-none font-bold w-full h-14 bg-compsa-white text-compsa-black rounded-md p-3 !pl-12 sm:p-4"
                  >
                    {/* {nextDays.map((day) => (
                      <option key={day.day} value={day.day}>
                        {day.formatted}
                      </option>
                    ))} */}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center p-3 sm:p-4 text-white ">
                    <img src="/room-booking/date.svg" className="w-6 h-6"></img>
                  </div>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center p-3 sm:p-4 text-white ">
                    <img
                      src="/room-booking/arrow.svg"
                      className=" h-6 w-6"
                    ></img>
                  </div>
                </div>
              </div>
              <div className="w-full xl:w-2/5 relative text-lg sm:text-base">
                <div>
                  <select
                    // onChange={(e) =>
                    //   // setRoomFilter(Number(e.target.value) || undefined)
                    // }
                    className="appearance-none w-full h-14 bg-compsa-gray text-compsa-white rounded-md p-3 sm:p-4"
                  >
                    <option value={""}>Select Room</option>
                    {/* {roomDetails &&
                      roomDetails.map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.name}
                        </option>
                      ))} */}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center p-3 sm:p-4 text-white ">
                    <img
                      src="/room-booking/arrow.svg"
                      className="filter invert h-6 w-6"
                    ></img>
                  </div>
                </div>
              </div>
            </div>
            {/* Room Blocking Warnings */}
            {/* {(() => {
              const blockedRoomsForDate = blockedRooms.filter(
                (block) =>
                  date >= new Date(block.start_time) &&
                  date <= new Date(block.end_time)
              );

              if (blockedRoomsForDate.length > 0) {
                const blockedRoomIds = blockedRoomsForDate.map(
                  (block) => block.room_id
                );
                const blockedRoomNames =
                  roomDetails
                    ?.filter((room) => blockedRoomIds.includes(room.id))
                    .map((room) => room.name) || [];

                if (blockedRoomIds.length === roomDetails?.length) {
                  // All rooms are blocked
                  return (
                    <div className="bg-red-600 text-white p-4 rounded-lg border border-red-700">
                      <h3 className="font-bold text-lg mb-2">
                        All Rooms Unavailable
                      </h3>
                      <p className="text-sm">
                        All rooms are currently blocked for{" "}
                        {date?.toLocaleDateString()}. Please select a different
                        date or contact an administrator.
                      </p>
                      {blockedRoomsForDate.map((block) => (
                        <p key={block.id} className="text-xs mt-1 text-red-200">
                          {
                            roomDetails?.find(
                              (room) => room.id === block.room_id
                            )?.name
                          }
                          : {block.reason}
                        </p>
                      ))}
                    </div>
                  );
                } else {
                  // Some rooms are blocked
                  return (
                    <div className="bg-yellow-600 text-white p-4 rounded-lg border border-yellow-700">
                      <h3 className="font-bold text-lg mb-2">
                        A Room Is Unavailable
                      </h3>
                      <p className="text-sm">
                        The following rooms is blocked for{" "}
                        {date?.toLocaleDateString()}:{" "}
                        {blockedRoomNames.join(", ")}
                      </p>
                      {blockedRoomsForDate.map((block) => (
                        <p
                          key={block.id}
                          className="text-xs mt-1 text-yellow-200"
                        >
                          {
                            roomDetails?.find(
                              (room) => room.id === block.room_id
                            )?.name
                          }
                          : {block.reason}
                        </p>
                      ))}
                    </div>
                  );
                }
              }
              return null;
            })()} */}

            {/* <RoomBooker
              isLoading={isLoading}
              date={date}
              bookings={bookings}
              userBookings={userBookings}
              setUserBookings={setUserBookings}
              roomDetails={filteredDetails}
              blockedRooms={blockedRooms}
              roomFilter={roomFilter}
            ></RoomBooker>
          </div>
          <div className="flex flex-col gap-4">
            <Card className="hidden xl:block">
              <div className="flex text-compsa-white h-6 items-center">
                Info
              </div>
            </Card>
            <div className="h-full">
              <Card className="h-full">
                {userBookings.name ? (
                  <div className="text-compsa-white flex flex-col gap-3  sm:gap-5 md:gap-7 sm:text-xl min-w-80">
                    <h2 className="sm:text-2xl font-bold mb-3">
                      {curRoom["name"]}
                    </h2>
                    <ul className="list-disc list-inside flex flex-col gap-2 text-base sm:text-lg">
                      <li>
                        <span className="font-semibold">Capacity:</span>{" "}
                        {curRoom["capacity"]}
                      </li>
                      <li>
                        <span className="font-semibold">Location:</span>{" "}
                        {curRoom["location"]}
                      </li>
                    </ul>
                    <button
                      onClick={handleRequest}
                      className="text-compsa-black text-lg rounded-lg bg-compsa-yellow border-compsa-black border border-solid p-4 font-semibold sm:font-medium w-3/5"
                    >
                      Next
                    </button>
                  </div>
                ) : (
                  <div className="text-compsa-white text-2xl min-w-80">
                    No Room Selected
                  </div>
                )}
              </Card> */}
          </div>
        </div>
      </div>
      {/* </div> */}
    </main>
  );
}
