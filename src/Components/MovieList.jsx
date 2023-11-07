import React, { useEffect, useRef, useState } from "react"
import GlobalApi from "../Services/GlobalApi"
import MovieCard from "./MovieCard"
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5"

function MovieList({ genreId }) {
  const [movieList, setMovieList] = useState([])
  const elementRef = useRef(null)

  useEffect(() => {
    getMovieByGenreId()
  }, [])

  const getMovieByGenreId = () => {
    GlobalApi.getMovieByGenreId(genreId).then((resp) => {
      setMovieList(resp.data.results)
    })
  }

  const sliderRight = (element) => {
    element.scrollLeft += 550
  }

  const sliderLeft = (element) => {
    element.scrollLeft -= 550
  }

  const handleScroll = (element) => {
    if (element.scrollLeft === 0) {
      // Tidak ada scroll ke kiri yang tersisa
      setIsLeftArrowVisible(false)
    } else {
      setIsLeftArrowVisible(true)
    }

    if (element.scrollLeft + element.clientWidth >= element.scrollWidth) {
      // Tidak ada scroll ke kanan yang tersisa
      setIsRightArrowVisible(false)
    } else {
      setIsRightArrowVisible(true)
    }
  }

  const [isLeftArrowVisible, setIsLeftArrowVisible] = useState(false)
  const [isRightArrowVisible, setIsRightArrowVisible] = useState(true)

  return (
    <div className="relative">
      <IoChevronBackOutline
        className={`text-[50px] text-white p-2 z-10 cursor-pointer absolute mt-[150px] ${
          isLeftArrowVisible ? "block" : "hidden"
        }`}
        onClick={() => sliderLeft(elementRef.current)}
      />

      <IoChevronForwardOutline
        className={`text-[50px] text-white p-2 z-10 cursor-pointer absolute right-0 mt-[150px] ${
          isRightArrowVisible ? "block" : "hidden"
        }`}
        onClick={() => sliderRight(elementRef.current)}
      />

      <div
        onScroll={(e) => handleScroll(e.target)}
        ref={elementRef}
        className="flex overflow-x-auto gap-8 scrollbar-none scroll-smooth pt-4 px-3 pb-4"
      >
        {movieList.map((item, index) => (
          <MovieCard movie={item} key={index} />
        ))}
      </div>
    </div>
  )
}

export default MovieList
