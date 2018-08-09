import React from 'react'
import { Card, CardHeader, CardBody, CardFooter } from 'mdbreact'

const CustomCard = ({  text, tag, color, className, compA, compB }) => (
	<Card className={className}>
		<CardHeader className='text-center' color="default-color" tag="h4">{text}</CardHeader>
		<CardBody>
				{compA}
		</CardBody>

		{compB && 
			<CardFooter>
				{compB}
			</CardFooter>
		}
	</Card>
	)

export default CustomCard