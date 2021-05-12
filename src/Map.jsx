import { useRef, useEffect } from 'react'
import * as d3 from 'd3'

export const Map = (props) => {

  const { geoJson, allegationsPerPrecinct } = props
  
  const maxAllegations = Math.max(...allegationsPerPrecinct.map(obj => obj.allegations))
  const scale = d3.scaleSequential([0, maxAllegations], d3.interpolateBlues)

  const svgRef = useRef()

  const renderMap = (mapData, path) => {
    d3.select(svgRef.current)
      .selectAll('path')
      .data(mapData.features)
      .enter()
      .append('path')
      .attr('id', d => `precinct-${d.properties['Precinct']}`)
      .attr('d', path)
      .attr('stroke', '#000000')
      .attr('stroke-width', '.2')
      .attr('fill', function(d) {
        const precinct = allegationsPerPrecinct.filter(item => item.precinct === d.properties['Precinct'])[0]
        return scale(precinct.allegations)
      }) 
  }
  
  useEffect(() => {

    const height = svgRef.current.clientHeight
    const width = svgRef.current.clientWidth

    const projection = d3.geoAlbers().fitSize([height, width], geoJson)

	  const pathGenerator = d3.geoPath().projection(projection) 
    if (geoJson) {
      renderMap(geoJson, pathGenerator)
    }
  }, [geoJson])

  return (
    <div className='wrapper'>
      <svg 
        className='precincts-map' 
        ref={svgRef} 
        height={500} 
        width={500}
        style={{marginTop: '2em'}}
      />
    </div>
  )
}